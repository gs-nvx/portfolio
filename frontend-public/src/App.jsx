import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./i18n";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ServiziPage from "./pages/ServiziPage";
import PortfolioPage from "./pages/PortfolioPage";
import ChiSonoPage from "./pages/ChiSonoPage";
import ContattiPage from "./pages/ContattiPage";
import BlogPage from "./pages/blog/BlogPage";
import BlogPostPage from "./pages/blog/BlogPostPage";
import NotFoundPage from "./pages/NotFoundPage";
import PageTransition from "./components/layout/PageTransition";
import CookieBanner from "./components/ui/CookieBanner";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/servizi"
            element={
              <PageTransition>
                <ServiziPage />
              </PageTransition>
            }
          />
          <Route
            path="/portfolio"
            element={
              <PageTransition>
                <PortfolioPage />
              </PageTransition>
            }
          />
          <Route
            path="/chi-sono"
            element={
              <PageTransition>
                <ChiSonoPage />
              </PageTransition>
            }
          />
          <Route
            path="/contatti"
            element={
              <PageTransition>
                <ContattiPage />
              </PageTransition>
            }
          />
          <Route
            path="/blog"
            element={
              <PageTransition>
                <BlogPage />
              </PageTransition>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <PageTransition>
                <BlogPostPage />
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFoundPage />
              </PageTransition>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <PageTransition>
                <PrivacyPolicyPage />
              </PageTransition>
            }
          />
        </Routes>
        <CookieBanner privacyPolicyPath="/privacy-policy" />
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}
