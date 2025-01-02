import { NextResponse } from 'next/server'
import { apiKeyService } from '@/services/apiKeyService'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { apiKey } = body

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      )
    }

    const isValid = await apiKeyService.validateApiKey(apiKey)

    return NextResponse.json({ isValid })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 