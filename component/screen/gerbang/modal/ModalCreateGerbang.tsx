import Button from '@component/widgets/button/Button';
import Input from '@component/widgets/input';
import Toast from '@component/widgets/toast';
import { createGerbang } from '@libs/service/GerbangService';
import { cn } from '@libs/utils/cn';
import { formikErrorMapper } from '@libs/utils/formikError';
import validationMapper from '@libs/utils/validationMapper';
import { CreateRequest } from '@libs/validation/GerbangRequest';
import { useFormik } from 'formik';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { NumericFormat } from 'react-number-format';

export default function ModalCreateGerbang() {
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: undefined,
            IdCabang: undefined,
            NamaGerbang: "",
            NamaCabang: "",
        },
        validationSchema: CreateRequest,
        onSubmit: async (values, { resetForm, setErrors }) => {
            setIsSubmit(true);

            try {
                let response = await createGerbang(values);

                if (response.status === 400) {
                    let errors = response.data.errors;
                    let objErrors = validationMapper(errors);

                    setErrors(objErrors);
                } else if (response.status === 201) {
                    toast.custom(
                        (t) => (
                            <Toast.Success
                                visible={t.visible}
                                onClose={() => toast.remove(t.id)}
                                text="Data Gerbang Berhasil Dibuat"
                            />
                        ),
                        { position: "top-center" }
                    );
                    location.reload();

                } else {
                    throw new Error(response.data.message);
                }
            } catch (error: any) {
                toast.custom(
                    (t) => (
                        <Toast.Error
                            visible={t.visible}
                            onClose={() => toast.remove(t.id)}
                            text={error.message}
                        />
                    ),
                    { position: "top-center" }
                );
            }

            setIsSubmit(false);
        },
    });

    return (
        <form
            action=""
            method="post"
            onSubmit={formik.handleSubmit}
            className="flex flex-col space-y-4 mt-4 "
        >
            <div>
                <div className="flex items-center">
                    <h1 className="text-[#000F46] text-sm font-medium leading-5">
                        Id Gerbang
                    </h1>
                    <img src="/icons/asterisk.svg" />
                </div>

                <NumericFormat
                    name="id"
                    decimalScale={2}
                    placeholder="Masukkan Id Gerbang"
                    valueIsNumericString={false}
                    onValueChange={(values) => {
                        const { value } = values;
                        formik.setFieldValue("id", value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                        }
                    }}
                    className={cn(
                        "w-full rounded-md p-3 border-[1px] outline-primary",
                        formikErrorMapper(formik, "id")
                            ? "border-red-500 bg-red-50"
                            : "border-slate-300"
                    )}
                />
                {formikErrorMapper(formik, "id") && (
                    <p className="mt-1 text-xs text-red-500 pl-2">
                        {formik.errors.id}
                    </p>
                )}
            </div>

            <Input.Text
                title="Nama Gerbang"
                name="NamaGerbang"
                icons="/icons/asterisk.svg"
                placeholder="Masukkan Nama Gerbang"
                value={formik.values.NamaGerbang}
                onChange={formik.handleChange}
                err={formikErrorMapper(formik, "NamaGerbang")}
                typeInput={formikErrorMapper(formik, "NamaGerbang") ? "err" : "default"}
                errMessage={formik.errors.NamaGerbang}
            />
          <div>
                <div className="flex items-center">
                    <h1 className="text-[#000F46] text-sm font-medium leading-5">
                        Id Cabang
                    </h1>
                    <img src="/icons/asterisk.svg" />
                </div>

                <NumericFormat
                    name="IdCabang"
                    decimalScale={2}
                    placeholder="Masukkan Id Cabang"
                    valueIsNumericString={false}
                    onValueChange={(values) => {
                        const { value } = values;
                        formik.setFieldValue("IdCabang", value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                        }
                    }}
                    className={cn(
                        "w-full rounded-md p-3 border-[1px] outline-primary",
                        formikErrorMapper(formik, "IdCabang")
                            ? "border-red-500 bg-red-50"
                            : "border-slate-300"
                    )}
                />
                {formikErrorMapper(formik, "IdCabang") && (
                    <p className="mt-1 text-xs text-red-500 pl-2">
                        {formik.errors.IdCabang}
                    </p>
                )}
            </div>
            <Input.Text
                title="Nama Cabang"
                name="NamaCabang"
                icons="/icons/asterisk.svg"
                placeholder="Masukkan Nama Cabang"
                value={formik.values.NamaCabang}
                onChange={formik.handleChange}
                err={formikErrorMapper(formik, "NamaCabang")}
                typeInput={formikErrorMapper(formik, "NamaCabang") ? "err" : "default"}
                errMessage={formik.errors.NamaCabang}
            />

            <Button
                btnWidth="full"
                btnSize="md"
                className="sm:py-3 sm:px-8 sm:text-base"
                isLoading={isSubmit}
                type="submit"
            >
                Tambah Data
            </Button>
        </form>
    )
}
