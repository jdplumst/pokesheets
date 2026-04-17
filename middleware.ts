export const config = {
  matcher: ["/"],
};

export default function middleware(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const isLoggedIn = cookie.includes("better-auth.session_token=");

  if (isLoggedIn) {
    return Response.redirect(new URL("/campaigns", request.url), 302);
  }

  return new Response(null, { status: 200 });
}