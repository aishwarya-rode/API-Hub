'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'

interface CreateKeyModalProps {
  onClose: () => void
  onCreate: (data: { name: string; monthlyLimit: number | null }) => void
}

export const CreateKeyModal = ({ onClose, onCreate }: CreateKeyModalProps) => {
  const [newKeyName, setNewKeyName] = useState('')
  const [monthlyLimit, setMonthlyLimit] = useState<number>(1000)
  const [limitEnabled, setLimitEnabled] = useState(false)

  const handleSubmit = () => {
    onCreate({
      name: newKeyName,
      monthlyLimit: limitEnabled ? monthlyLimit : null
    })
  }

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Create a new API key</h2>
          <p className="text-gray-400">Enter a name and limit for the new API key.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-2">
              Key Name — <span className="text-gray-400">A unique name to identify this key</span>
            </label>
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Key Name"
              className="w-full bg-[#232936] border border-gray-600 rounded-lg p-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={limitEnabled}
                onChange={(e) => setLimitEnabled(e.target.checked)}
                className="rounded border-gray-600 bg-[#232936] text-blue-500 focus:ring-blue-500"
              />
              <span>Limit monthly usage*</span>
            </label>
            <input
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(Number(e.target.value))}
              disabled={!limitEnabled}
              className="w-full bg-[#232936] border border-gray-600 rounded-lg p-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none disabled:opacity-50"
            />
          </div>

          <p className="text-sm text-gray-400">
            * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
          </p>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="bg-[#232936] hover:bg-[#2a3241] text-gray-300 px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
} 