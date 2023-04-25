import React from 'react'
import { useSearchParams } from 'react-router-dom'

// Handle params in URL
const useQueryParams = () => {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}

export default useQueryParams
