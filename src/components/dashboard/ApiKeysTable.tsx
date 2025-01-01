'use client'

import { useState } from 'react'
import { ApiKey } from '@/services/apiKeyService'
import { formatDate } from '@/utils/dateFormat'
import { TrashIcon, PencilIcon, EyeIcon, EyeSlashIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'

interface ApiKeysTableProps {
  apiKeys: ApiKey[]
  onDeleteKey: (id: string) => void
  onUpdateStatus: (id: string) => void
  onUpdateName: (id: string, name: string) => void
  onShowToast: (message: string, type: 'success' | 'error') => void
}

export const ApiKeysTable = ({ 
  apiKeys, 
  onDeleteKey, 
  onUpdateStatus, 
  onUpdateName,
  onShowToast 
}: ApiKeysTableProps) => {
  const [hiddenKeys, setHiddenKeys] = useState<Set<string>>(new Set())
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null)

  const toggleKeyVisibility = (id: string) => {
    setHiddenKeys(prev => {
      const newHidden = new Set(prev)
      if (newHidden.has(id)) {
        newHidden.delete(id)
      } else {
        newHidden.add(id)
      }
      return newHidden
    })
  }

  const copyToClipboard = async (key: string, id: string) => {
    try {
      await navigator.clipboard.writeText(key)
      setCopiedKey(id)
      onShowToast('Copied API key to clipboard', 'success')
      setTimeout(() => setCopiedKey(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
      onShowToast('Failed to copy API key', 'error')
    }
  }

  const maskApiKey = (key: string) => {
    return `${key.slice(0, 8)}${'•'.repeat(24)}`
  }

  return (
    <div className="rounded-xl bg-[#232936] border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold">API Keys</h2>
        <p className="text-gray-400 mt-1">The key is used to authenticate your requests to the API.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#1a1f2e]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">API Key</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Options</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {apiKeys.map((key) => (
              <tr key={key.id} className="hover:bg-[#1a1f2e] transition-colors duration-150">
                <td className="px-6 py-4">
                  {editingKey?.id === key.id ? (
                    <input
                      type="text"
                      value={editingKey.name}
                      onChange={(e) => setEditingKey({ ...editingKey, name: e.target.value })}
                      className="bg-[#1a1f2e] border border-gray-700 p-1 rounded text-white w-full"
                    />
                  ) : (
                    <span>{key.name}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-[#1a1f2e] px-2 py-1 rounded text-gray-300">
                      {hiddenKeys.has(key.id) ? maskApiKey(key.key) : key.key}
                    </code>
                    <button
                      onClick={() => toggleKeyVisibility(key.id)}
                      className="text-gray-400 hover:text-gray-300"
                      title={hiddenKeys.has(key.id) ? "Show API Key" : "Hide API Key"}
                    >
                      {hiddenKeys.has(key.id) ? (
                        <EyeIcon className="h-5 w-5" />
                      ) : (
                        <EyeSlashIcon className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(key.key, key.id)}
                      className="text-gray-400 hover:text-gray-300"
                      title="Copy to clipboard"
                    >
                      {copiedKey === key.id ? (
                        <CheckIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <ClipboardDocumentIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onUpdateStatus(key.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      key.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {key.status}
                  </button>
                </td>
                <td className="px-6 py-4 text-gray-300">{formatDate(key.created_at)}</td>
                <td className="px-6 py-4">
                  {editingKey?.id === key.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onUpdateName(key.id, editingKey.name)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingKey(null)}
                        className="text-gray-400 hover:text-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingKey(key)}
                        className="text-gray-400 hover:text-gray-300"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onDeleteKey(key.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 