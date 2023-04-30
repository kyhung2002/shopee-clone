import React from 'react'
import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { Product as IProduct } from 'src/types/product.type'
import { formatVietnamNumber } from 'src/utils/utils'

const Product = ({ product }: { product: IProduct }) => {
  return (
    <Link to=''>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.0625rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img src={product.image} alt='product' className='absolute top-0 left-0 object-cover w-full h-full' />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[32px] text-xs line-clamp-2'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>đ</span>
              <span className='text-xs'>{formatVietnamNumber(product.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>đ</span>
              <span className='text-sm'>{formatVietnamNumber(product.price)}</span>
            </div>
          </div>
          <div className='flex items-center justify-end mt-3'>
            <ProductRating rating={product.rating}></ProductRating>
            <div className='flex items-center ml-2 text-sm'>
              <span>{formatVietnamNumber(product.sold)}</span>
              <span className='ml-1'>đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
