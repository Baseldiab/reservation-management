import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/provideres/theme-provider";

import AppRouter from "@/router";

// Ui components
import { Toaster } from "@/components/ui/toaster";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <AppRouter />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
