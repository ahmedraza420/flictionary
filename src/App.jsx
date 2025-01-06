import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' 
import Base from './components/base/Base';
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import Detail from './pages/detail/Detail';
import Discover from './pages/discover/Discover';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#121320',
      // paper: '#032541',
    }
  },
  typography: {
    fontSize: 12,
  }
});

const router = createBrowserRouter([{
  path: '/',
  element: <Base />,
  children: [
    {path: '', element: <Home />},
    {path: '/discover/:type', element: <Discover />},
    {path: '/search/:query', element: <Search />},
    {path: '/:type/:id', element: <Detail />}
  ]
}])

function App() {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
