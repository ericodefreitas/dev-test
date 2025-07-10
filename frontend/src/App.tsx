import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { persistor, store } from "./redux/store";

import { routes } from "./routes";

import ThemeProvider from "./contexts/ThemeContext";
import SidebarProvider from "./contexts/SidebarContext";
import LayoutProvider from "./contexts/LayoutContext";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PersistGate } from "reduxjs-toolkit-persist/lib/integration/react";
import SplashScreenLayout from "./layouts/SplashScreenLayout";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ErrorBoundary } from "react-error-boundary";
import { errorHandling } from "./utils/errorHandling";
import { DialogProvider } from "./contexts/DialogContext";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: (failureCount, error) => {
          if (error.name === "CanceledError")
            return false;

          return failureCount < 2;
        },
        retryDelay: 5000,
        staleTime: 10 * 1000,
        queryFn: async ({ meta }) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const { fetchFn } = meta as any;
          if (!fetchFn)
            throw new Error("Nenhuma função de fetch definida!");

          return fetchFn();
        }
      }
    }
  });

  return (
    <ErrorBoundary FallbackComponent={({ error }) => {
      console.log(error);
      errorHandling(error)
      return <h1>teste</h1>
    }}>
      <Suspense fallback={<SplashScreenLayout />}>
        <LoadingProvider>
          <DialogProvider>
            <QueryClientProvider client={queryClient}>
              <Provider store={store}>
                <PersistGate loading={<SplashScreenLayout />} persistor={persistor}>
                  <HelmetProvider>
                    <Helmet
                      titleTemplate={`%s | ${import.meta.env.VITE_APP_TITLE}`}
                      defaultTitle={import.meta.env.VITE_APP_TITLE}
                    />
                    <ThemeProvider>
                      <SidebarProvider>
                        <LayoutProvider>
                          <RouterProvider router={routes} />
                        </LayoutProvider>
                      </SidebarProvider>
                    </ThemeProvider>
                  </HelmetProvider>
                </PersistGate>
              </Provider>
            </QueryClientProvider>
          </DialogProvider>
        </LoadingProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
