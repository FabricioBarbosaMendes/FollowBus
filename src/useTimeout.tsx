import { useEffect } from 'react'

export const useTimeout = (callback:any, timeout:any) => {
  useEffect(() => {
    const timeoutReference = setTimeout(callback, timeout);
 
    return () => clearTimeout(timeoutReference);
   }, [])
}