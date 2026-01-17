import { TCredential } from "@libs/types/AuthType";
import axios from "@libs/utils/axios";
import { deleteCookie, setCookie } from "cookies-next";
import { AES } from "crypto-js";


async function setupCookies(response: { headers: any; data: { data: any } }) {
  let headers = response.headers;
  let data = response.data.data;

  let authorizeCookie = {
    token: headers["x-token"],
  };

  if (process.env.SECRET_KEY?.toString()) {
    let chiperText = AES.encrypt(
      JSON.stringify(authorizeCookie),
      process.env.SECRET_KEY?.toString()
    );
    await setCookie("test-authorize", chiperText, {
      path: "/",
      sameSite: true,
      maxAge: 60 * 60
    });

      setTimeout(() => {
      deleteCookie("test-authorize");
      window.location.href = "/login";
    }, 60 * 60 * 1000);
  }
}

export async function doLogin(values: TCredential): Promise<any> {
  let response = axios
    .post(`auth/login`, values)
    .then(async (response) => {
      await setupCookies(response);

      return response;
    })
    .catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });

  return response;
}