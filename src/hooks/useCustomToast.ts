import { useToast } from '@chakra-ui/react'

export const useCustomToast = () => {
  const toast = useToast()
  const customToast = (
    title: string,
    status: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined
  ) => toast({ title, status, duration: 3000, position: 'bottom-left' })

  return customToast
}
