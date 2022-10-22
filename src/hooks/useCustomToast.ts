import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

export const useCustomToast = () => {
  const toast = useToast()

  const customToast = useCallback(
    (
      title: string,
      status: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined
    ) => toast({ title, status, duration: 3000, position: 'bottom-left' }),
    [toast]
  )
  return customToast
}
