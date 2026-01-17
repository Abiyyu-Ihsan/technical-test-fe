import { ApiResponseCreateGerbang, GerbangParams } from "@libs/types/GerbangType";
import { axiosAuth } from "@libs/utils/axios";

export async function fetchListGerbang(
    params: GerbangParams
) {
    try {
        const response = await axiosAuth.get("gerbangs", {
            params,
        });

        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
        throw error;
    }
}

export async function createGerbang(values: ApiResponseCreateGerbang): Promise<any> {
  let response = axiosAuth
    .post(`gerbangs`, values)
    .then(async (response) => {

      return response;
    })
    .catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });

  return response;
}

export async function updateGerbang(values: ApiResponseCreateGerbang): Promise<any> {
  let response = axiosAuth
    .put(`gerbangs`, values)
    .then(async (response) => {

      return response;
    })
    .catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });

  return response;
}



export const deleteGerbang = (payload: {
  id: number;
  IdCabang: number;
}) => {
  return axiosAuth.delete("gerbangs", {
    data: payload,
  });
};

