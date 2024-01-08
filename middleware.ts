import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);


  // Create a Supabase client configured to use cookies
  const { supabase, response } = createClient(request)
  // Refresh session if expired - required for Server Components
  const { data: { session } } = await supabase.auth.getSession()

  if(session) {
    if (request.nextUrl.pathname.startsWith('/signin') || request.nextUrl.pathname.startsWith('/signup')) {
      return NextResponse.rewrite(new URL('/', request.url))
    }
  }
  if(!session) {
    if (request.nextUrl.pathname.startsWith('/signout')) {
      return NextResponse.rewrite(new URL('/', request.url))
    }
  }
  return response
}
// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)',],
}
 