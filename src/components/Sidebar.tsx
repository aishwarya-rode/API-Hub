'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  HomeIcon, 
  BeakerIcon, 
  DocumentTextIcon, 
  CommandLineIcon,
  DocumentIcon,
  Cog8ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

export default function Sidebar() {
  const [selectedWorkspace, setSelectedWorkspace] = useState('Personal')
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10 bg-[#232936] p-1 rounded-full border border-gray-800"
      >
        {isOpen ? (
          <ChevronLeftIcon className="h-4 w-4 text-gray-300" />
        ) : (
          <ChevronRightIcon className="h-4 w-4 text-gray-300" />
        )}
      </button>

      <div className={`
        ${isOpen ? 'w-64' : 'w-0'} 
        transition-all duration-300 ease-in-out 
        h-screen bg-[#1a1f2e] border-r border-gray-800 
        flex flex-col overflow-hidden whitespace-nowrap
      `}>
        {/* Logo */}
        <div className="p-6">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="Tavily Logo" 
              width={120} 
              height={40}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Workspace Selector */}
        <div className="px-3 mb-6">
          <button
            className="w-full px-3 py-2 text-left text-white bg-[#232936] rounded-lg flex items-center justify-between"
            onClick={() => {/* Handle workspace switch */}}
          >
            <span>{selectedWorkspace}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1">
          <div className="space-y-1 px-3">
            <Link 
              href="/overview" 
              className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-[#232936] rounded-lg group"
            >
              <HomeIcon className="h-5 w-5" />
              <span>Overview</span>
            </Link>

            <Link 
              href="/research-assistant" 
              className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-[#232936] rounded-lg"
            >
              <BeakerIcon className="h-5 w-5" />
              <span>Research Assistant</span>
            </Link>

            <Link 
              href="/research-reports" 
              className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-[#232936] rounded-lg"
            >
              <DocumentTextIcon className="h-5 w-5" />
              <span>Research Reports</span>
            </Link>

            <Link 
              href="/playground" 
              className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-[#232936] rounded-lg"
            >
              <CommandLineIcon className="h-5 w-5" />
              <span>API Playground</span>
            </Link>

            <Link 
              href="/invoices" 
              className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-[#232936] rounded-lg"
            >
              <DocumentIcon className="h-5 w-5" />
              <span>Invoices</span>
            </Link>

            <Link 
              href="/documentation" 
              className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-[#232936] rounded-lg"
            >
              <DocumentTextIcon className="h-5 w-5" />
              <span>Documentation</span>
              <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-[#232936] rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              A
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium">Aishwarya Rode</div>
            </div>
            <Cog8ToothIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
