import { SuccessAPI } from 'src/types/utils.type'
import http from 'src/utils/http'

export const getCategories = () => {
  return http.get<SuccessAPI<Category[]>>('categories')
}
