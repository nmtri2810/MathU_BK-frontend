import AppRoutes from '@/routers/index'
import { NextUIProvider } from '@nextui-org/react'

function App() {
  return (
    <NextUIProvider>
      <AppRoutes />
    </NextUIProvider>
  )
}

export default App
