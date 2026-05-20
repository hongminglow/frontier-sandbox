import { useState } from 'react'
import { ThemeProvider } from '@app/providers/ThemeProvider'
import { LandingPage } from '@pages/LandingPage'
import { LoadingScreen } from '@widgets/LoadingScreen'

export const App = () => {
  const [isReady, setIsReady] = useState(false)

  return (
    <ThemeProvider>
      <LoadingScreen onComplete={() => setIsReady(true)} />
      <LandingPage isReady={isReady} />
    </ThemeProvider>
  )
}
