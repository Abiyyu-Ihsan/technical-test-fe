import * as Yup from "yup";

const LoginRequest = Yup.object().shape({
  username: Yup.string()
    .required("Username Wajib Diisi"),
  password: Yup.string()
    .required("Password wajib diisi"),
});

export default LoginRequest;
