// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const protectedRoute = createRouteMatcher([
//   "/",
//   "/upcoming",
//   "/meeting(.*)",
//   "/previous",
//   "/recordings",
//   "/personal-room",
// ]);

// // export default clerkMiddleware((auth, req) => {
// //   if (protectedRoute(req)) auth().protect();
// // }, { debug: true });

// export default clerkMiddleware();

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
//   // matcher: [
//   //   "/((?!.+\\.[\\w]+$|_next).*)",
//   //   "/",
//   //   "/upcoming",
//   //   "/meeting(.*)",
//   //   "/previous",
//   //   "/recordings",
//   //   "/personal-room",
//   //   "/(api|trpc)(.*)",
//   // ],
// };


import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const protectedRoute = createRouteMatcher([
  '/',
  '/upcoming',
  '/meeting(.*)',
  '/previous',
  '/recordings',
  '/personal-room',
]);

export default clerkMiddleware((auth, req) => {
  if (protectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};