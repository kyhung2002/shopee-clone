import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormDataTotal, schema } from 'src/components/others/validateRules'
import Input from 'src/components/Input'
import { registerAccount } from 'src/apis/auth.api'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorAPI } from 'src/types/utils.type'
const Register = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError
  } = useForm<FormDataTotal>({
    resolver: yupResolver(schema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormDataTotal, 'confirm_password'>) => registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    // console.log(data)
    let body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorAPI<Omit<FormDataTotal, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormDataTotal, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormDataTotal, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-orange lg:min-h-[775px] lg:bg-hero-pattern lg:bg-center lg:bg-no-repeat'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className="shadow-sm' rounded bg-white p-10" onSubmit={onSubmit} autoComplete='off' noValidate>
              <div className='text-2xl'>Đăng Ký</div>
              <Input
                name='email'
                type='email'
                control={control}
                placeholder='Email'
                errorMessage={errors.email?.message}
              ></Input>
              <div className='mt-3'>
                <Input
                  name='password'
                  type='password'
                  control={control}
                  placeholder='Password'
                  errorMessage={errors.password?.message}
                ></Input>
              </div>
              <div className='mt-3'>
                <Input
                  name='confirm_password'
                  type='password'
                  control={control}
                  placeholder='Confirm Password'
                  errorMessage={errors.confirm_password?.message}
                ></Input>
              </div>
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  ĐĂNG KÍ
                </button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className='mr-1 text-slate-400'>Bạn đã có tài khoản?</span>
                  <Link className='text-red-400' to='/login'>
                    Đăng Nhập
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
