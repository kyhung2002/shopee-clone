import React from 'react'
import { FormDataTotal, FormLoginData } from '../others/validateRules'
import { useController, UseControllerProps, Control } from 'react-hook-form'
interface IProps {
  type: React.HTMLInputTypeAttribute | undefined
  placeholder?: string | undefined
  errorMessage?: string
  className?: string
  control: Control<FormDataTotal, any> | Control<FormLoginData, any>
  name: keyof FormDataTotal
}
const Input = ({ control, name, placeholder, errorMessage, className, type }: IProps) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: ''
  })
  return (
    <div className='mt-8'>
      <input
        {...field}
        placeholder={placeholder}
        type={type}
        className={`w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 ${className}`}
      />
      <div className={`mt-1 min-h-[1rem] text-sm text-red-600`}>{errorMessage}</div>
    </div>
  )
}

export default Input
