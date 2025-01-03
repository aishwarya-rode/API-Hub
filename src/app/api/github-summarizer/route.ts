import { NextResponse } from 'next/server'
import { apiKeyService } from '@/services/apiKeyService'
import { createGitHubSummaryChain } from '@/lib/chain'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { githubUrl } = body

    const apiKey = request.headers.get('x-api-key')

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      )
    }

    if (!githubUrl) {
      return NextResponse.json(
        { error: 'GitHub URL is required' },
        { status: 400 }
      )
    }

    // First validate the API key
    const isValid = await apiKeyService.validateApiKey(apiKey)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      )
    }

    try {
      // Get README content
      const readmeContent = await getGitHubReadme(githubUrl)
      
      // Generate AI summary using the chain
      const summary = await createGitHubSummaryChain(readmeContent)
      
      return NextResponse.json({ 
        ...summary,
        url: githubUrl
      })
    } catch (error) {
      console.error('Error processing request:', error)
      return NextResponse.json(
        { error: 'Failed to fetch or summarize GitHub repository information' },
        { status: 404 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 

async function getGitHubReadme(githubUrl: string): Promise<string> {
  try {
    // Extract owner and repo from GitHub URL
    const urlParts = githubUrl.replace('https://github.com/', '').split('/')
    const owner = urlParts[0]
    const repo = urlParts[1].replace('.git', '') // Remove .git if present

    // Fetch README content using GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          'Accept': 'application/vnd.github.raw+json',
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch README')
    }

    const content = await response.text()
    return content

  } catch (error) {
    console.error('Error fetching GitHub README:', error)
    throw new Error('Failed to fetch README content')
  }
}

