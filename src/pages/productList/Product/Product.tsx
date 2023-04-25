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
          <img src={product.image} alt='product' className='absolute left-0 top-0 h-full w-full object-cover' />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[32px] text-xs line-clamp-2'>{product.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>đ</span>
              <span>{product.price_before_discount}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>đ</span>
              <span>{formatVietnamNumber(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating}></ProductRating>
            <div className='ml-2 flex items-center text-sm'>
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
