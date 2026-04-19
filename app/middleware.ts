import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const publicPaths = ["/", "/login", "/pricing"]

  const isPublic = publicPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  )

  if (isPublic) {
    return NextResponse.next()
  }

  return NextResponse.next()
}