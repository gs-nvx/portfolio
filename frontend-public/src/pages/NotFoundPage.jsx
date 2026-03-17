import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Pagina non trovata — GST Code Lab</title>
      </Helmet>
      <div
        style={{ background: "#0a0f0d", color: "#6b8f7d" }}
        className="min-h-screen flex items-center
        justify-center pt-14"
      >
        <div className="text-center px-6">
          <p className="text-teal-400 text-xs uppercase tracking-widest mb-4">
            Errore 404
          </p>
          <h1 className="text-6xl font-medium text-white mb-4">404</h1>
          <p className="text-gray-500 text-base mb-8 max-w-sm mx-auto">
            La pagina che cerchi non esiste o è stata spostata.
          </p>
          <Link
            to="/"
            className="bg-teal-600 hover:bg-teal-500 text-white
              font-medium px-8 py-3 rounded-lg transition inline-block"
          >
            Torna alla home
          </Link>
        </div>
      </div>
    </>
  );
}
