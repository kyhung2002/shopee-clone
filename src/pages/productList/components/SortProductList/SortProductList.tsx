import classNames from 'classnames'
import { QueryConfig } from '../../ProductList'
import { ProductListConfig } from 'src/types/product.type'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { create, omit } from 'lodash'

interface PaginationProps {
  queryConfig: QueryConfig
  pageSize: number
}

const SortProductList = ({ queryConfig, pageSize }: PaginationProps) => {
  const { sort_by = 'createdAt', order } = queryConfig
  const page = Number(queryConfig.page)
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams(omit({ ...queryConfig, sort_by: sortByValue }, 'order')).toString()
    })
  }
  const handleSortByPrice = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams({ ...queryConfig, sort_by: 'price', order: sortByValue }).toString()
    })
  }
  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8 px-4 text-center capitalize ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy('view'),
              'bg-white text-black hover:bg-slate-300': !isActiveSortBy('view')
            })}
            onClick={() => handleSort('view')}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8  px-4 text-center capitalize  ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy('createdAt'),
              'bg-white text-black hover:bg-slate-300': !isActiveSortBy('createdAt')
            })}
            onClick={() => handleSort('createdAt')}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8  px-4 text-center capitalize  ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy('sold'),
              'bg-white text-black hover:bg-slate-300': !isActiveSortBy('sold')
            })}
            onClick={() => handleSort('sold')}
          >
            Bán chạy
          </button>
          <select
            className={classNames('h-8  px-4 text-left text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy('price'),
              'bg-white text-black hover:bg-slate-300': !isActiveSortBy('price')
            })}
            onChange={(e) => handleSortByPrice(e.target.value as Exclude<ProductListConfig['sort_by'], undefined>)}
            value={order || ''}
          >
            <option value='' disabled>
              Giá
            </option>
            <option value='asc'>Giá: Thấp đến cao</option>
            <option value='desc'>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex gap-2'>
            {!(page === 1) ? (
              <Link
                className={classNames(
                  'rounded-bt-sm flex h-8 items-center justify-center  rounded-tl-sm  px-3 shadow-sm hover:bg-slate-100',
                  {
                    'cursor-not-allowed bg-white/60': page === 1,
                    'bg-white': !(page === 1)
                  }
                )}
                to={{
                  pathname: '/',
                  search: createSearchParams({ ...queryConfig, page: String(page - 1) }).toString()
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
                </svg>
              </Link>
            ) : (
              <button
                className={classNames('rounded-bt-sm h-8  rounded-tl-sm  px-3 shadow-sm hover:bg-slate-100', {
                  'cursor-not-allowed bg-white/60': page === 1,
                  'bg-white': !(page === 1)
                })}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
                </svg>
              </button>
            )}
            {!(page === pageSize) ? (
              <Link
                className={classNames(
                  'rounded-bt-sm flex h-8 items-center justify-center  rounded-tl-sm  px-3 shadow-sm hover:bg-slate-100',
                  {
                    'cursor-not-allowed bg-white/60': page === pageSize,
                    'bg-white': !(page === pageSize)
                  }
                )}
                to={{
                  pathname: '/',
                  search: createSearchParams({ ...queryConfig, page: String(page + 1) }).toString()
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75' />
                </svg>
              </Link>
            ) : (
              <button
                className={classNames('rounded-bt-sm h-8  rounded-tl-sm  px-3 shadow-sm hover:bg-slate-100', {
                  'cursor-not-allowed bg-white/60': page === pageSize,
                  'bg-white': !(page === pageSize)
                })}
              >
                {' '}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75' />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
