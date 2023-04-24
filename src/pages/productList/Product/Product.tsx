import React from 'react'
import { Link } from 'react-router-dom'

const Product = () => {
  return (
    <Link to=''>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.0625rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src='https://source.unsplash.com/random'
            alt='product'
            className='absolute left-0 top-0 h-full w-full object-cover'
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[32px] text-xs line-clamp-2'>
            Loa bluetooth mini không dây,nghe nhạc,giá rẻ,công nghệ blutooth 5.0 BINTECH
          </div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>đ</span>
              <span>5.000</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>đ</span>
              <span>2.000</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <div className='flex items-center'>
              <div className='relative h-5 w-5'>
                <div className='absolute left-0 top-0 h-full overflow-hidden' style={{ width: '50%' }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='h-full fill-yellow-300'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-5 w-5 fill-current text-gray-300'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
            <div className='ml-2 flex items-center text-sm'>
              <span>5.66k</span>
              <span className='ml-1'>đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
