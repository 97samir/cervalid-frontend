import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({

  defaultOptions: {

    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false
    }

  }

});

export default function ReactQueryProvider({
  children
}) {

  return (

    <QueryClientProvider
      client={queryClient}
    >
      {children}
    </QueryClientProvider>

  );
}