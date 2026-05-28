import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/AppRoutes'
import AppProvider from './routes/AppProvider'
import { ToastContainer } from 'react-toastify'


function App() {


  return (
    <>
      <AppProvider>
        <ToastContainer />
        <RouterProvider router={routes} />
      </AppProvider>
    </>
  )
}

export default App
