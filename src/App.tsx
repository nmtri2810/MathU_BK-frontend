import AppRoutes from '@/routers/index';
import { NextUIProvider } from '@nextui-org/system';
import { Toaster } from '@/components/ui/sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/locales/i18next';
import { Providers } from '@/store/provider';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Providers>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
          <NextUIProvider>
            <Toaster position='top-right' richColors duration={1500} toastOptions={{}} />
            <AppRoutes />
          </NextUIProvider>
        </GoogleOAuthProvider>
      </Providers>
    </I18nextProvider>
  );
}

export default App;
