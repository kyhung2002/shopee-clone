import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getProduct, getProductDetail } from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
import { calculateDiscount, formatCurrency, formatNumberToSocialStyle, getIdFromNameId } from 'src/utils/utils'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import { QueryConfig } from '../productList/ProductList'
import useQueryParams from 'src/hooks/useQueryParams'
import Product from '../productList/components/Product'
const ProductDetail = () => {
  const { nameId } = useParams()
  let id = getIdFromNameId(nameId as string)
  // Get single product
  const { data: ProductDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductDetail(id)
  })

  const product = ProductDetailData?.data.data

  const queryConfig: QueryConfig = {
    page: '1',
    limit: '20',
    category: product?.category._id
  }
  // Call related products
  const { data: relatedProducts, isLoading } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => getProduct(queryConfig as ProductListConfig),
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(product)
  })
  console.log('🚀 ~ file: ProductDetail.tsx ~ line 34 ~ ProductDetail ~ relatedProducts', relatedProducts)

  const [currentIndexImages, setCurrentIndexImages] = useState<number[]>([0, 5])
  const [activeImage, setActiveImage] = useState(product?.images[currentIndexImages[0]])
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[currentIndexImages[0]])
    }
  }, [product, currentIndexImages])
  const handleChangeImage = (image: string) => {
    setActiveImage(image)
  }

  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )
  const next = () => {
    if (currentIndexImages[1] < (product as ProductType).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => {
        return [prev[0] - 1, prev[1] - 1]
      })
    }
  }
  if (!product) return null
  return (
    <div className='bg-gray-200 py-6 '>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-8'>
            <div className='col-span-5'>
              <div className='relative w-full pt-[100%] shadow'>
                <img
                  src={activeImage || product.image}
                  alt={product.name}
                  className='absolute left-0 top-0 h-full w-full bg-white object-cover'
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-3'>
                {product.images.length > 5 && (
                  <button
                    className='p absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 py-2 text-white'
                    onClick={prev}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-5'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
                    </svg>
                  </button>
                )}

                {currentImages.map((item, idx) => (
                  <div
                    className={classNames('relative w-full border  pt-[100%] shadow', {
                      'border-orange': activeImage === item,
                      'border-transparent': activeImage !== item
                    })}
                    key={idx}
                  >
                    <img
                      src={item}
                      alt={`product-${idx + 1}`}
                      className='absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover'
                      onClick={() => handleChangeImage(item)}
                    />
                  </div>
                ))}
                {product.images.length > 5 && (
                  <button
                    className='p absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 py-2 text-white'
                    onClick={next}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-5 w-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75'
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='flex items-center'>
                <span className='mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                <ProductRating rating={product.rating} active={'h-full fill-orange'}></ProductRating>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 bg-orange p-2 text-white'>
                  {calculateDiscount(product.price_before_discount, product.price) + '% giảm'}
                </div>
              </div>
              <div className='mt-8 flex items-center '>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <div className='ml-10 flex items-center'>
                  <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-4 w-4'>
                      <path
                        fillRule='evenodd'
                        d='M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                  <input min={1} max={10} className='h-8 border-y-2 p-2 outline-none' type='number' defaultValue={1} />
                  <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-4 w-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                    </svg>
                  </button>
                </div>
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='mr-2 h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                  Thêm Vào Giỏ Hàng
                </button>
                <button className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm </div>
          <div className='mx-4 mb-4 mt-2 text-sm leading-loose'>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <h2 className='text-gray-500'>Có thể bạn sẽ thích</h2>
          <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {relatedProducts &&
              relatedProducts.data.data.products.map((item, index) => (
                <div className='col-span-1' key={index}>
                  <Product product={item}></Product>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
