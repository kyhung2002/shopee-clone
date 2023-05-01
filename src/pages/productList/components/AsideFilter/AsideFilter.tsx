import { Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button/Button'
import { QueryConfig } from '../../ProductList'
import { createSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import { useState } from 'react'
import { isEmpty, isUndefined, omit, omitBy } from 'lodash'
import RatingStar from 'src/components/RatingStar'
interface IProps {
  queryConfig: QueryConfig
  categories: Category[] | undefined
}
const initialPrice = {
  price_min: '',
  price_max: ''
}
const AsideFilter = ({ queryConfig, categories }: IProps) => {
  const category = queryConfig.category
  const [price, setPrice] = useState<{
    price_min: number | string | undefined
    price_max: number | string | undefined
  }>(initialPrice)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()
  const handleError = () => {
    let error = false
    if (!price) return
    if (price) {
      let priceMin = Number(price.price_min)
      let priceMax = Number(price.price_max)
      if (!priceMax && !priceMin) {
        setError('Giá không hợp lệ !')
        error = true
      } else if (priceMin && priceMax && priceMax <= priceMin) {
        setError('Giá không hợp lệ')
        error = true
      } else if (priceMin < 0 || priceMax < 0) {
        setError('Giá không hợp lệ')
        error = true
      }
    }
    return error
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let error = handleError()

    if (!error) {
      navigate({
        pathname: '/',
        search: createSearchParams(
          omitBy(
            {
              ...queryConfig,
              price_max: price.price_max?.toString() || '',
              price_min: price.price_min?.toString() || ''
            },
            isEmpty
          )
        ).toString()
      })
    }
  }
  const handleDeleteAsideFilter = () => {
    navigate({
      pathname: '/',
      search: createSearchParams(omit({ ...queryConfig }, ['price_max', 'price_min', 'rating_filter'])).toString()
    })
    setPrice(initialPrice)
  }
  return (
    <div className='py-4'>
      <Link to='/' className='flex items-center font-bold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='mr-3 h-5 w-5 '
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
        </svg>
        Tất cả danh mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <ul>
        {categories &&
          categories.map((item, index) => (
            <li
              key={index}
              className={classNames('py-2 pl-2', {
                'font-bold text-orange': category === item._id
              })}
            >
              <Link
                to={{ pathname: '/', search: createSearchParams({ ...queryConfig, category: item._id }).toString() }}
                key={item._id}
              >
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
      <Link to='/' className='mt-4 flex items-center font-bold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='mr-3 h-5 w-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
          />
        </svg>
        Bộ lộc tìm kiếm
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2' onSubmit={handleSubmit}>
          <div className='flex items-start'>
            <input
              type='number'
              className='w-full grow rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500'
              name='price_min'
              placeholder='Từ'
              value={price.price_min}
              max={99999999}
              onChange={(e) => {
                setPrice((prev) => ({ ...prev, price_min: e.target.value }))
                setError('')
              }}
            />
            <div className='mx-2 mt-2 shrink-0'>--</div>
            <input
              type='number'
              className='w-full grow rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500'
              name='to'
              placeholder='Đến'
              value={price.price_max}
              max={99999999}
              onChange={(e) => {
                setPrice((prev) => ({ ...prev, price_max: e.target.value }))
                setError('')
              }}
            />
          </div>
          <div className='mt-4 text-center text-red-600 '>{error}</div>
          <Button className='mt-3 w-full bg-orange py-2 text-sm uppercase text-white hover:bg-opacity-90'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='text-sm'>Đánh giá</div>
      <RatingStar queryConfig={queryConfig}></RatingStar>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <Button className='w-full bg-orange px-2 py-2 text-sm uppercase text-white' onClick={handleDeleteAsideFilter}>
        Xóa tất cả{' '}
      </Button>
    </div>
  )
}

export default AsideFilter
