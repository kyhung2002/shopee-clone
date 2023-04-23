import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/productList'
import Login from './pages/loginPage'
import Register from './pages/registerPage'
import RegisterLayout from './layouts/registerLayout'
import MainLayout from './layouts/mainLayout'
import Profile from './pages/profilePage'
export default function useRouteElements() {
  const isAuthenticated = false
  function ProtectedRoute() {
    return isAuthenticated ? <Outlet></Outlet> : <Navigate to='/login'></Navigate>
  }
  function RejectedRoute() {
    return !isAuthenticated ? <Outlet></Outlet> : <Navigate to='/'></Navigate>
  }
  let routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute></ProtectedRoute>,
      children: [
        {
          path: '/profile',
          element: (
            <MainLayout>
              <Profile></Profile>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute></RejectedRoute>,
      children: [
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
      ]
    },
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList></ProductList>
        </MainLayout>
      ),
      index: true
    }
  ])
  return routeElements
}
