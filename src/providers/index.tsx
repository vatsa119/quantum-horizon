import { ReactNode } from 'react'
import { LenisProvider } from './LenisProvider'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <LenisProvider>
      {children}
    </LenisProvider>
  )
}
