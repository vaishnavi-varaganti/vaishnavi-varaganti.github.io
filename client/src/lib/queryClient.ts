import { QueryClient } from "@tanstack/react-query";

// Simplified query client for static frontend-only app
// This doesn't make any actual API calls but keeps React Query for state management
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // No actual querying functionality needed - purely frontend
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
      enabled: false, // Disable all automatic queries
    },
  },
});
