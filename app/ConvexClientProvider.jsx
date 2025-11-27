"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";

// Next.js loads env vars from .env.local at startup. Avoid TypeScript's non-null
// assertion operator (!) in a .jsx file; instead provide a safe fallback so the
// app still compiles. The local Convex dev server sets NEXT_PUBLIC_CONVEX_URL
// to http://127.0.0.1:3210.
const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL || "http://127.0.0.1:3210"
);

export function ConvexClientProvider({ children }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}