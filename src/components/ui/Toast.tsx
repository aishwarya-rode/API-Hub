'use client'

import { useEffect } from 'react'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'

interface ToastProps {
  message: string
  onClose: () => void
  type?: 'success' | 'error' | 'info' | 'warning'
}

export const Toast = ({ message, onClose, type = 'success' }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-yellow-600'
  }[type]

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg`}>
      <CheckIcon className="h-5 w-5" />
      {message}
      <button onClick={onClose} className="ml-2">
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  )
} 