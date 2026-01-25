import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <div className="container max-w-xl text-center">
        <h1 className="font-serif text-5xl">404</h1>
        <p className="mt-3 text-muted-foreground">La página que buscas no existe o fue movida.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild variant="cta">
            <Link to="/tienda">Ir a la tienda</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
