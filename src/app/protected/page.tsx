'use client'

export default function Protected() {
  return (
    <div className="min-h-screen bg-[#1a1f2e] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#232936] p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-4">Protected Page</h1>
          <p className="text-gray-300">
            You have successfully accessed this protected page with a valid API key.
          </p>
        </div>
      </div>
    </div>
  )
} 