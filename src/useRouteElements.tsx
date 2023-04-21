import React from 'react'
import { useRoutes } from 'react-router-dom'
import ProductList from './pages/productList'
import Login from './pages/loginPage'
import Register from './pages/registerPage'
import RegisterLayout from './layouts/registerLayout'
export default function useRouteElements() {
  let routeElements = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ])
  return routeElements
}
