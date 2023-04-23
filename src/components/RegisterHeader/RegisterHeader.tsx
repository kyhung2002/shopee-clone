import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import { logo } from '../others/other'
const RegisterHeader = () => {
  const isMatch = useMatch('/login')
  return (
    <header className='py-5'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to='/'>{logo.mainLogo}</Link>
          <div className='ml-5 text-xl lg:text-2xl'>{isMatch ? 'Đăng nhập' : 'Đăng Ký'}</div>
        </nav>
      </div>
    </header>
  )
}

export default RegisterHeader
