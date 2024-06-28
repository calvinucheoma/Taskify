import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that should be protected
const isProtectedRoute = createRouteMatcher([
  "/", // Add any additional routes here
]); // Update clerkMiddleware to manually protect routes

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect(); // Protect the route if it matches the defined criteria
  }
});

export const config = {
  // Protects all routes, including api/trpc.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// In our 'app' folder, we create a new folder '[[...rest]]' and then add the pages that we want to be protected into
// this folder
