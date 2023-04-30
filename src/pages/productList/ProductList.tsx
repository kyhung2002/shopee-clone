import React, { useState } from 'react'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'
import { useQuery } from '@tanstack/react-query'
import { getProduct } from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import { isUndefined, omitBy } from 'lodash'
import SortProductList from './components/SortProductList'
import { getCategories } from 'src/apis/categoryAPI'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
const ProductList = () => {
  const queryParams: QueryConfig = useQueryParams()
  // tránh người dùng nhập các params ko cần thiết.
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      category: queryParams.category,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => getProduct(queryConfig as ProductListConfig),
    keepPreviousData: true
  })
  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })

  return (
    <div className='min-h-screen bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3 '>
            <AsideFilter queryConfig={queryConfig} categories={categoryData?.data.data}></AsideFilter>
          </div>

          {data && data.data.data.products.length > 0 ? (
            <div className='col-span-9'>
              <SortProductList
                queryConfig={queryConfig}
                pageSize={data.data.data.pagination.page_size}
              ></SortProductList>
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {data.data.data.products.map((item, index) => (
                  <div className='col-span-1' key={index}>
                    <Product product={item}></Product>
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            </div>
          ) : (
            <div className='col-span-9 mt-5 text-center text-red-500'>Không có sản phẩm phù hợp </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList
