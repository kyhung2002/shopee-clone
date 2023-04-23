import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/productList'
import Login from './pages/loginPage'
import Register from './pages/registerPage'
import RegisterLayout from './layouts/registerLayout'
import MainLayout from './layouts/mainLayout'
import Profile from './pages/profilePage'
import { AppContext } from './contexts/app.context'
// Handle Protected Routes and Rejected Routes

export default function useRouteElements() {
  function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet></Outlet> : <Navigate to='/login' />
  }
  function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet></Outlet> : <Navigate to='/' />
  }
  let routeElements = useRoutes([
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
