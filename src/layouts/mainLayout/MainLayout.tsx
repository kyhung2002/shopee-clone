import React from 'react'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface IProps {
  children?: React.ReactNode
}
const MainLayout = ({ children }: IProps) => {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  )
}

export default MainLayout
