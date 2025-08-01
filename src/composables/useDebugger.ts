export function useDebugger() {
  const isDevelopment = import.meta.env.MODE === 'development'

  const log = (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args)
    }
  }

  const warn = (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args)
    }
  }

  const error = (...args: any[]) => {
    if (isDevelopment) {
      console.error(...args)
    }
  }

  return { log, warn, error }
} 