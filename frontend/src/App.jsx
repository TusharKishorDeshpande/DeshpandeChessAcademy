import { Outlet } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Theme and Layout
import theme from './theme';
import Layout from './components/layout/Layout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Layout>
          <Outlet />
          </Layout>
        <ToastContainer position="bottom-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
