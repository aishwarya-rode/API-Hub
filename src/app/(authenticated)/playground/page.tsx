'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Toast } from '@/components/ui/Toast'
import { apiKeyService } from '@/services/apiKeyService'

export default function Playground() {
  const [apiKey, setApiKey] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const isValid = await apiKeyService.validateApiKey(apiKey)
      
      if (isValid) {
        setToastMessage('Valid API Key, /Protected can be accessed')
        setToastType('success')
        setShowToast(true)
        setTimeout(() => {
          router.push('/protected')
        }, 1500)
      } else {
        setToastMessage('Invalid API key')
        setToastType('error')
        setShowToast(true)
      }
    } catch (error) {
      setToastMessage('Error validating API key')
      setToastType('error')
      setShowToast(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1f2e] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">API Playground</h1>
        
        <div className="bg-[#232936] p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-2">
                Enter your API Key
              </label>
              <input
                type="text"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2 bg-[#1a1f2e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="sk_test_..."
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Validate API Key
            </button>
          </form>
        </div>
      </div>
      
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
} 