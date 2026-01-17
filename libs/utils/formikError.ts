
export function formikErrorMapper(formik: any, field: string): boolean {
  if (formik.errors[field] && formik.touched[field]) {
    return true;
  }

  return false
}