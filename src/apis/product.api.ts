import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessAPI } from 'src/types/utils.type'
import http from 'src/utils/http'

export const getProduct = (params: ProductListConfig) =>
  http.get<SuccessAPI<ProductList>>('products', {
    params
  })
export const getProductDetail = (id: string) => http.get<SuccessAPI<Product>>(`products/${id}`)
