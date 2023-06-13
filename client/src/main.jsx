import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { extendTheme } from "@chakra-ui/react";
import App from "./App.jsx";
import Post from "./components/post/Post.jsx";
import ErrorPage from "./components/errorPage/ErrorPage.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// Update the breakpoints as key-value pairs
const breakpoints = {
  sm: "300px",
  md: "500px",
  base: "700px",
  xl: "1200px",
  "2xl": "1536px",
};

// 3. Extend the theme
const theme = extendTheme({
  breakpoints,
  components: {
    Text: { baseStyle: { fontSize: "sm" } },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/posts/:id",
    element: <Post />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
        <ToastContainer />
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
