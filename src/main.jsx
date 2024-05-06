import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Pages/Root/Root'
import Home from './Pages/Home/Home'
import AllMovies from './Pages/AllMovies/AllMovies'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/allMovie',
        element:<AllMovies/>,
        loader:()=>fetch('http://localhost:5000/moviesCount')
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
