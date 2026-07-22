// import { JwtPayload } from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    //  const decodeToken=jwt.decode(result.data.accessToken)as JwtPayload
    // if(decodedToken)
    return NextResponse.redirect(new URL('/', request.url)) //
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [
        //matcher er route k protected korbe otherwise won't work for other routes
        '/dashboard/:path*',
        '/adminDashboard/:path*',
        '/authorDashboard/:path*',

        // '/((?!api|_next/static|_next/image|login|register|.*\\.png$).*)',//it shows which routes are accessible publically and need not to be protected
    ]

}