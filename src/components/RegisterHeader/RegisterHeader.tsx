import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../others/other'
const RegisterHeader = () => {
  return (
    <header className='py-5'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to='/'>{logo.mainLogo}</Link>
          <div className='ml-5 text-xl lg:text-2xl'>Đăng ký</div>
        </nav>
      </div>
    </header>
  )
}

export default RegisterHeader
