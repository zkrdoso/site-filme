import { Film } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card/50 mt-16">
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <Film className="w-5 h-5 text-primary" />
          <span className="font-serif font-bold text-foreground">CineLog</span>
        </Link>
        <p className="text-sm text-muted-foreground">
          O seu diário cinematográfico. Registre, avalie e compartilhe.
        </p>
        <p className="text-xs text-muted-foreground">
          Dados fornecidos por TMDB
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
