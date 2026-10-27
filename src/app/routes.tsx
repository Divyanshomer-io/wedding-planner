import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import Placeholder from '../components/Placeholder'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Placeholder title="Home" /> },
      { path: 'budget', element: <Placeholder title="Budget" /> },
      { path: 'book', element: <Placeholder title="Book" /> },
      { path: 'guests', element: <Placeholder title="Guests" /> },
      { path: 'more', element: <Placeholder title="More" /> },
    ],
  },
])
