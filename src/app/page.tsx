'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/overview')
    }
  }, [session, router])

  return (
    <div className="min-h-screen bg-[#1a1f2e] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to API Key Management</h1>
        {!session ? (
          <button
            onClick={() => signIn('google')}
            className="flex items-center gap-2 bg-white text-gray-800 font-medium py-2 px-6 rounded-lg transition-all duration-200 hover:bg-gray-100 mx-auto"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-white">Redirecting to dashboard...</p>
          </div>
        )}
      </div>
    </div>
  )
}
