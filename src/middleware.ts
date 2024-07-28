import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    const res = NextResponse.next()

    const { pathname } = request.nextUrl
    const token = request.cookies.get('token')?.value

    const privatePath = ['/account/owner']

    const authPath = ['/login', '/register']

    if (token && authPath.includes(pathname)) {
        return NextResponse.redirect(new URL('/account/owner', request.url))
    }

    if (!token && privatePath.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return res
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
}
