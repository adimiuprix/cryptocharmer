import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Check if the user is authenticated via cookies
    const accessToken = request.cookies.get('sb-access-token')
    
    // If no access token is found, redirect to login page
    if (!accessToken) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
    
    // In a production environment, you might want to verify the JWT token
    // here or use the Supabase Auth client to ensure it's still valid.
    // For this implementation, checking the cookie presence is the first line of defense.
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
