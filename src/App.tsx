import AppRoutes from '@/routers/index';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <NextUIProvider>
      <Toaster position='top-right' richColors duration={1500} toastOptions={{}} />
      <AppRoutes />
    </NextUIProvider>
  );
}

export default App;
