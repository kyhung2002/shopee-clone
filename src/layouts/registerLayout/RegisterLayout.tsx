import React from 'react'
import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

interface IProps {
  children?: React.ReactNode
}
const RegisterLayout = ({ children }: IProps) => {
  return (
    <>
      <RegisterHeader></RegisterHeader>
      {children}
      <Footer></Footer>
    </>
  )
}

export default RegisterLayout
