import React, { InputHTMLAttributes } from 'react'
import { FormDataTotal, FormLoginData } from '../others/validateRules'
import { useController, UseControllerProps, Control } from 'react-hook-form'
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  name: string
  classNameInput?: string
  control: Control
}
const Input = ({ control, name, placeholder, errorMessage, classNameInput, type }: IProps) => {
  const { field } = useController({
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
        className={`w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 ${classNameInput}`}
      />
      <div className={`mt-1 min-h-[1rem] text-sm text-red-600`}>{errorMessage}</div>
    </div>
  )
}

export default Input
