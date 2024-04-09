import { ThemeProvider } from '@material-tailwind/react'
import AppRoutes from '@/routers/index'
import { theme } from '@/constants/index'

function App() {
  return (
    <ThemeProvider value={theme}>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
