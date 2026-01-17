export default function validationMapper(errors: any) {
  let objErrors: any = {};

  Object.keys(errors).forEach((_item: any, _index: any, _arr: any) => {
    objErrors[_item] = errors[_item][0];
  });

  return objErrors;
}
