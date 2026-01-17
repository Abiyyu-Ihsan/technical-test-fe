import * as Yup from "yup";

export const CreateRequest = Yup.object().shape({
  id: Yup.number()
    .required("Id Gerbang Wajib Diisi"),
  IdCabang: Yup.number()
    .required("Id Cabang Wajib Diisi"),
  NamaGerbang: Yup.string()
    .required("Nama Gerbang Wajib Diisi"),
  NamaCabang: Yup.string()
    .required("Nama Cabang Wajib Diisi"),
});

export const UpdateRequest = Yup.object().shape({
  id: Yup.number()
    .required("Id Gerbang Wajib Diisi"),
  IdCabang: Yup.number()
    .required("Id Cabang Wajib Diisi"),
  NamaGerbang: Yup.string()
    .required("Nama Gerbang Wajib Diisi"),
  NamaCabang: Yup.string()
    .required("Nama Cabang Wajib Diisi"),
});





