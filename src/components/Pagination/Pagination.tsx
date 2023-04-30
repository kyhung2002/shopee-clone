import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import { QueryConfig } from 'src/pages/productList/ProductList'
interface PaginationProps {
  queryConfig: QueryConfig
  pageSize: number
}
const RANGE = 2
const Pagination = ({ queryConfig, pageSize }: PaginationProps) => {
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let docBefore = false
    const renderDotBefore = (index: number) => {
      if (!docBefore) {
        docBefore = true
        return (
          <span key={index} className='mx-2  rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='mx-2  rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber >= RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: '/',
              search: createSearchParams({ ...queryConfig, page: pageNumber.toString() }).toString()
            }}
            key={index}
            className={classNames('mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm', {
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      {page === 1 ? (
        <button className='mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2 text-gray-500 shadow-sm'>
          Prev
        </button>
      ) : (
        <Link
          className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'
          to={{ pathname: '/', search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString() }}
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <button className='mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2 text-gray-500 shadow-sm'>
          Next
        </button>
      ) : (
        <Link
          className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'
          to={{ pathname: '/', search: createSearchParams({ ...queryConfig, page: (page + 1).toString() }).toString() }}
        >
          Next
        </Link>
      )}
    </div>
  )
}

export default Pagination
