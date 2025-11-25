---
inclusion: always
---

# Project Conventions and Guidelines

## Layout Usage

- **Account-related pages**: All pages under `/account/*` should use the `profile` layout
  - Set using: `definePageMeta({ layout: 'profile' })`
  - The profile layout includes the sidebar navigation for account pages

## User Data Access

- **Always use `$getUser()` helper** to access authenticated user data
  - Access via: `const { $getUser } = useNuxtApp()` then `const user = $getUser()`
  - **Never access localStorage directly** for user data
  - The helper provides centralized access to user information from the auth session

## API Calls

- **Always use the `useApi()` composable** for all API calls
  - Located at: `app/composables/useApi.ts`
  - Handles authentication tokens automatically
  - Provides both reactive (`get`, `post`, `put`, `del`) and immediate (`fetchGet`, `fetchPost`, etc.) methods
  - For public endpoints, use: `{ requiresAuth: false }`

## Import Rules

- **Do NOT add imports outside of `<script setup>`** for files in:
  - `components/` directory
  - `pages/` directory
- Nuxt 3 auto-imports composables, components, and utilities
- Only add explicit imports when absolutely necessary (e.g., types)

## Authentication

- Authentication tokens are stored in localStorage
- Token is automatically included in API requests via `useApi()` composable
- User data is retrieved via `$getUser()` helper from the Nuxt plugin
- On logout: Clear both `authToken` and `user` from localStorage

## Code Style

- Use Vue 3 Composition API with `<script setup>`
- Use TypeScript for type safety
- Use Tailwind CSS for styling
- Follow Nuxt 3 conventions and best practices
