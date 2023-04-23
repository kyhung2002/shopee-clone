export interface ErrorAPI<Data> {
  message: string
  data?: Data
}
export interface SuccessAPI<Data> {
  message: string
  data: Data
}
