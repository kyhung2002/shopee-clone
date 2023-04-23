import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { FormDataTotal, FormLoginData, loginSchema } from 'src/components/others/validateRules'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError
  } = useForm<FormLoginData>({
    resolver: yupResolver(loginSchema)
  })
  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<FormDataTotal, 'confirm_password'>>>(error)) {
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
  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormLoginData, 'confirm_password'>) => loginAccount(body)
  })

  return (
    <div className=' bg-orange py-10 lg:min-h-[775px] lg:bg-hero-pattern lg:bg-center lg:bg-no-repeat'>
      <div className='container '>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className="shadow-sm' rounded bg-white p-10" onSubmit={onSubmit} noValidate={true}>
              <div className='text-2xl'>Đăng Nhập</div>
              <div className='mt-8'>
                <Input
                  name='email'
                  type='email'
                  control={control}
                  placeholder='Email'
                  errorMessage={errors.email?.message}
                ></Input>
              </div>
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
                <button
                  type='submit'
                  className='w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng nhập
                </button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className='mr-1 text-slate-400'>Bạn chưa có tài khoản?</span>
                  <Link className='text-red-400' to='/register'>
                    Đăng Ký
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

export default Login
