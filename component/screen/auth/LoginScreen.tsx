import Button from '@component/widgets/button/Button'
import Card from '@component/widgets/cards'
import Input from '@component/widgets/input'
import Toast from '@component/widgets/toast'
import LayoutMain from '@libs/layout/Layoutmain'
import { doLogin } from '@libs/service/AuthService'
import { formikErrorMapper } from '@libs/utils/formikError'
import validationMapper from '@libs/utils/validationMapper'
import LoginRequest from '@libs/validation/LoginRequest'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import LoginIllustration from '../../../public/illustration/Loginillustrasi'

export default function LoginScreen() {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginRequest,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setIsSubmit(true);

      try {
        let response = await doLogin(values);

        if (response.status === 200) {
          toast.custom(
            (t) => (
              <Toast.Success
                visible={t.visible}
                onClose={() => toast.remove(t.id)}
                text={"Berhasil login"}
              />
            ),
            { position: "top-center" }
          );
          router.push("/");

        } else if (response.status === 422) {
          let errors = response.data.errors;
          let objErrors = validationMapper(errors);

          setErrors(objErrors);
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
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md sm:max-w-lg md:max-w-4xl lg:max-w-5xl bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* LEFT - FORM */}
        <div className="flex items-center justify-center p-6 sm:p-8 md:p-12">
          <div className="w-full max-w-sm">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Masuk ke Akun
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Silakan login untuk melanjutkan
            </p>

            <form
              className="flex flex-col space-y-5 sm:space-y-6 mt-6"
              onSubmit={formik.handleSubmit}
            >
              <Input.Text
                title="Username"
                name="username"
                icons="/icons/asterisk.svg"
                placeholder="Masukkan Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                err={formikErrorMapper(formik, "username")}
                errMessage={formik.errors.username}
                typeInput={
                  formikErrorMapper(formik, "username") ? "err" : "default"
                }
                disabled={isSubmit}
              />

              <Input.Password
                title="Kata Sandi"
                name="password"
                icons="/icons/asterisk.svg"
                placeholder="Masukkan Kata Sandi"
                value={formik.values.password}
                onChange={formik.handleChange}
                err={formikErrorMapper(formik, "password")}
                errMessage={formik.errors.password}
                typeInput={
                  formikErrorMapper(formik, "password") ? "err" : "default"
                }
                disabled={isSubmit}
              />

              <Button
                btnWidth="full"
                btnSize="md"
                isLoading={isSubmit}
                type="submit"
              >
                Masuk
              </Button>
            </form>
          </div>
        </div>

        {/* RIGHT - ILLUSTRATION */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500 p-8 lg:p-10">
          <div className="text-center text-white max-w-sm">
            <LoginIllustration />
            <h2 className="text-lg lg:text-xl font-semibold mt-6">
              Selamat Datang Kembali
            </h2>
            <p className="text-sm text-indigo-100 mt-2">
              Kelola akun Anda dengan aman dan mudah
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
);

}
