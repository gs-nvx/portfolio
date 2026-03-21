import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CmsEditorPage from "./pages/cms/CmsEditorPage";
import BlogListPage from "./pages/blog/BlogListPage";
import BlogEditPage from "./pages/blog/BlogEditPage";
import ConfiguratorPage from "./pages/configurator/ConfiguratorPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/admin">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/cms"
            element={
              <PrivateRoute>
                <CmsEditorPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/blog"
            element={
              <PrivateRoute>
                <BlogListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <PrivateRoute>
                <BlogEditPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/configuratore"
            element={
              <PrivateRoute>
                <ConfiguratorPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
