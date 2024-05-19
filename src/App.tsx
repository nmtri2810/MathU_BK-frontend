import AppRoutes from '@/routers/index';
import { NextUIProvider } from '@nextui-org/system';
import { Toaster } from '@/components/ui/sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <NextUIProvider>
        <Toaster position='top-right' richColors duration={1500} toastOptions={{}} />
        <AppRoutes />
      </NextUIProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
