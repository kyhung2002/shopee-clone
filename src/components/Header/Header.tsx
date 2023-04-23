import { Link } from 'react-router-dom'
import { logo } from '../others/other'
import Popover from '../Popover'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useMutation } from '@tanstack/react-query'
import { logOut } from 'src/apis/auth.api'
import { clearAccessTokenFromLS } from 'src/utils/auth'
import { toast } from 'react-toastify'
const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)
  const logOutMutation = useMutation({
    mutationFn: () => logOut(),
    onSuccess: () => {
      setIsAuthenticated(false)
      clearAccessTokenFromLS()
      toast.success("Đăng xuất thành công !")
    }
  })
  const handleLogout = () => {
    logOutMutation.mutate()
  }
  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)] pb-5 pt-2 text-white'>
      <div className='container'>
        <div className='flex justify-end'>
          <Popover
            className='flex items-center py-1 cursor-pointer hover:text-gray-300'
            renderPopover={
              <div className='relative bg-white border border-gray-200 rounded-sm shadow-md'>
                <div className='flex flex-col py-2 pl-3 pr-20'>
                  <button className='px-3 py-2 hover:text-orange'>Tiếng Việt</button>
                  <button className='px-3 py-2 mt-2 hover:text-orange'>Tiếng Anh</button>
                </div>
              </div>
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1'>Tiếng Việt</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </Popover>
          {!isAuthenticated && (
            <div className='flex items-center text-sm text-gray-200 '>
              <Link to='/register' className='px-2 hover:text-gray-300'>
                Đăng Ký
              </Link>
              <Link to='/login' className='px-2 border-l border-gray-300 hover:text-gray-300'>
                Đăng Nhập
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <Popover
              className='flex items-center py-1 ml-6 cursor-pointer hover:text-gray-300 '
              renderPopover={
                <div className='bg-white border border-gray-200 rounded-sm shadow-md '>
                  <Link
                    to='/profile'
                    className='block px-3 py-2 text-left bg-white hover:bg-slate-100 hover:text-cyan-500'
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link to='/' className='block px-3 py-2 text-left bg-white hover:bg-slate-100 hover:text-cyan-500'>
                    Đơn mua
                  </Link>
                  <button
                    className='block w-full px-3 py-2 text-left bg-white hover:bg-slate-100 hover:text-cyan-500'
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </div>
              }
            >
              <div className='flex-shrink-0 w-6 h-6 mr-2'>
                <img
                  src='https://source.unsplash.com/random'
                  alt='avatar'
                  className='object-cover w-full h-full rounded-full'
                />
              </div>
              <div>trankyhung</div>
            </Popover>
          )}
        </div>
        <div className='grid items-end grid-cols-12 gap-4 mt-4'>
          <Link to='/' className='col-span-2'>
            {logo.logoWhite}
          </Link>
          <form className='col-span-9'>
            <div className='flex p-1 bg-white rounded-sm'>
              <input
                type='text'
                name='search'
                className='flex-grow px-3 py-2 text-black bg-transparent border-none outline-none'
                placeholder='Đăng ký và nhận voucher bạn mới đến 70k!'
              />
              <button className='flex-shrink-0 px-6 py-2 rounded-sm bg-orange hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className='cols-span-1 justify-self-end'>
            <Popover
              placement='bottom-end'
              renderPopover={
                <div
                  className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm
              shadow-md'
                >
                  <div className='p-2'>
                    <div className='text-gray-400 capitalize'>Sản phẩm mới thêm</div>
                    <div className='mt-5'>
                      <div className='flex mt-4'>
                        <div className='flex-shrink-0 h-11 w-11'>
                          <img
                            src='https://source.unsplash.com/random'
                            alt='product'
                            className='object-cover w-full h-full'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>
                            Keycap nhựa PBT cao cấp, nút phím lắp bàn phím cơ phối màu hơn 50 mẫu(Chỉ có bộ nút phím,
                            không bao gồm bàn phím) BigCat
                          </div>
                        </div>
                        <div className='flex-shrink-0 ml-2'>
                          <span className='text-orange'>₫250.000</span>
                        </div>
                      </div>
                      <div className='flex mt-4'>
                        <div className='flex-shrink-0 h-11 w-11'>
                          <img
                            src='https://source.unsplash.com/random'
                            alt='product'
                            className='object-cover w-full h-full'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>
                            Keycap nhựa PBT cao cấp, nút phím lắp bàn phím cơ phối màu hơn 50 mẫu(Chỉ có bộ nút phím,
                            không bao gồm bàn phím) BigCat
                          </div>
                        </div>
                        <div className='flex-shrink-0 ml-2'>
                          <span className='text-orange'>₫250.000</span>
                        </div>
                      </div>
                      <div className='flex mt-4'>
                        <div className='flex-shrink-0 h-11 w-11'>
                          <img
                            src='https://source.unsplash.com/random'
                            alt='product'
                            className='object-cover w-full h-full'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>
                            Keycap nhựa PBT cao cấp, nút phím lắp bàn phím cơ phối màu hơn 50 mẫu(Chỉ có bộ nút phím,
                            không bao gồm bàn phím) BigCat
                          </div>
                        </div>
                        <div className='flex-shrink-0 ml-2'>
                          <span className='text-orange'>₫250.000</span>
                        </div>
                      </div>
                      <div className='flex mt-4'>
                        <div className='flex-shrink-0 h-11 w-11'>
                          <img
                            src='https://source.unsplash.com/random'
                            alt='product'
                            className='object-cover w-full h-full'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>
                            Keycap nhựa PBT cao cấp, nút phím lắp bàn phím cơ phối màu hơn 50 mẫu(Chỉ có bộ nút phím,
                            không bao gồm bàn phím) BigCat
                          </div>
                        </div>
                        <div className='flex-shrink-0 ml-2'>
                          <span className='text-orange'>₫250.000</span>
                        </div>
                      </div>
                      <div className='flex mt-4'>
                        <div className='flex-shrink-0 h-11 w-11'>
                          <img
                            src='https://source.unsplash.com/random'
                            alt='product'
                            className='object-cover w-full h-full'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>
                            Keycap nhựa PBT cao cấp, nút phím lắp bàn phím cơ phối màu hơn 50 mẫu(Chỉ có bộ nút phím,
                            không bao gồm bàn phím) BigCat
                          </div>
                        </div>
                        <div className='flex-shrink-0 ml-2'>
                          <span className='text-orange'>₫250.000</span>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-between mt-6'>
                      <div className='text-xs text-gray-500 capitalize'>Thêm vào giỏ hàng</div>
                      <button className='px-4 py-2 text-white capitalize rounded-sm bg-orange hover:bg-opacity-80'>
                        Xem giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              }
            >
              <Link to='/'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-8 h-8'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
