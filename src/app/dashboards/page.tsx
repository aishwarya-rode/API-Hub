'use client'

import { useState, useEffect } from 'react'
import { apiKeyService, ApiKey } from '@/services/apiKeyService'
import { Modal } from '@/components/ui/Modal'
import { Toast } from '@/components/ui/Toast'
import { CurrentPlan } from '@/components/dashboard/CurrentPlan'
import { ApiKeysTable } from '@/components/dashboard/ApiKeysTable'
import { CreateKeyModal } from '@/components/dashboard/CreateKeyModal'

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null)

  useEffect(() => {
    fetchApiKeys()
  }, [])

  const fetchApiKeys = async () => {
    try {
      const data = await apiKeyService.fetchApiKeys()
      setApiKeys(data)
    } catch (error) {
      showToast('Failed to fetch API keys', 'error')
    }
  }

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setToast({ show: true, message, type })
  }

  // Handler functions that will be passed to child components
  const handleDeleteKey = async (id: string) => {
    try {
      await apiKeyService.deleteApiKey(id)
      setApiKeys(apiKeys.filter(key => key.id !== id))
      showToast('API key deleted successfully', 'warning')
    } catch (error) {
      showToast('Failed to delete API key', 'error')
    }
  }

  const handleUpdateStatus = async (id: string) => {
    try {
      const key = apiKeys.find(k => k.id === id)
      const newStatus = key?.status === 'active' ? 'inactive' : 'active'
      await apiKeyService.updateKeyStatus(id, newStatus)
      setApiKeys(apiKeys.map(key => 
        key.id === id 
          ? { ...key, status: newStatus }
          : key
      ))
      showToast('API key status updated successfully', 'success')
    } catch (error) {
      showToast('Failed to update API key status', 'error')
    }
  }

  const handleUpdateName = async (id: string, name: string) => {
    try {
      await apiKeyService.updateKeyName(id, name)
      setApiKeys(apiKeys.map(key => 
        key.id === id 
          ? { ...key, name }
          : key
      ))
      showToast('API key updated successfully', 'success')
    } catch (error) {
      showToast('Failed to update API key', 'error')
    }
  }

  const handleCreateKey = async (data: { name: string; monthlyLimit: number | null }) => {
    try {
      const newKey = {
        name: data.name,
        key: `vsk_${Math.random().toString(36).substring(2)}`,
        status: 'active',
        monthly_limit: data.monthlyLimit
      }
      
      const createdKey = await apiKeyService.createApiKey(newKey)
      setApiKeys([createdKey, ...apiKeys])
      setIsCreating(false)
      showToast('API key created successfully', 'success')
    } catch (error) {
      showToast('Failed to create API key', 'error')
    }
  }

  // ... other handler functions

  return (
    <div className="min-h-screen bg-[#1a1f2e] p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="text-sm text-gray-400 mb-1">Pages / Overview</div>
            <h1 className="text-3xl font-bold text-white">Overview</h1>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
          >
            + Create New API Key
          </button>
        </div>

        <CurrentPlan />

        <ApiKeysTable 
          apiKeys={apiKeys}
          onDeleteKey={handleDeleteKey}
          onUpdateStatus={handleUpdateStatus}
          onUpdateName={handleUpdateName}
          onShowToast={showToast}
        />

        {isCreating && (
          <CreateKeyModal 
            onClose={() => setIsCreating(false)}
            onCreate={handleCreateKey}
          />
        )}

        {toast?.show && (
          <Toast 
            message={toast.message} 
            type={toast.type}
            onClose={() => setToast(null)} 
          />
        )}
      </div>
    </div>
  )
}
