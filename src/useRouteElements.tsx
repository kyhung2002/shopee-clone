import React from 'react'
import { useRoutes } from 'react-router-dom'
import ProductList from './pages/productList'
import Login from './pages/loginPage'
import Register from './pages/registerPage'
import RegisterLayout from './layouts/registerLayout'
import MainLayout from './layouts/mainLayout'
export default function useRouteElements() {
  let routeElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList></ProductList>
        </MainLayout>
      )
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
