import * as yup from 'yup'
export const schema = yup
  .object({
    email: yup
      .string()
      .email('Vui lòng nhập đúng định dạng email')
      .required('Email là bắt buộc')
      .min(5, 'Độ dài từ 5 - 160 ký tự')
      .max(160, 'Độ dài từ 5 - 160 ký tự'),
    password: yup
      .string()
      .required('Password là bắt buộc')
      .min(6, 'Độ dài từ 6 - 160 ký tự')
      .max(160, 'Độ dài từ 6 - 160 ký tự'),
    confirm_password: yup
      .string()
      .required('Nhập lại password là bắt buộc')
      .min(6, 'Độ dài từ 6 - 160 ký tự')
      .max(160, 'Độ dài từ 6 - 160 ký tự')
      .oneOf([yup.ref('password')], 'Password phải trùng với password đã nhập trước đó'),
    name: yup.string().required('Nhập tên sản phẩm cần tìm kiếm').trim()
  })
  .required()
export type FormDataTotal = yup.InferType<typeof schema>
export const loginSchema = schema.omit(['confirm_password'])
export type FormLoginData = yup.InferType<typeof loginSchema>
