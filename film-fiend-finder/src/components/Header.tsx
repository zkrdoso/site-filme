import { Link, useNavigate } from "react-router-dom";
import { Search, Film, User, LogOut } from "lucide-react";
import { useState } from "react";
import { MOCK_MOVIES } from "@/data/movies";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const filteredMovies = query.length > 1
    ? MOCK_MOVIES.filter(m => m.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Film className="w-6 h-6 text-primary" />
          <span className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
            CineLog
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Início</Link>
          {user && (
            <>
              <Link to="/my-reviews" className="text-muted-foreground hover:text-foreground transition-colors">Minhas Resenhas</Link>
              <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors">Perfil</Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar filmes..."
                  className="w-full px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm border-b border-border"
                />
                {filteredMovies.length > 0 && (
                  <div className="max-h-64 overflow-y-auto">
                    {filteredMovies.map((movie) => (
                      <button
                        key={movie.id}
                        onClick={() => {
                          navigate(`/film/${movie.id}`);
                          setSearchOpen(false);
                          setQuery("");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors text-left"
                      >
                        <img src={movie.poster_url} alt="" className="w-8 h-12 object-cover rounded" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{movie.title}</p>
                          <p className="text-xs text-muted-foreground">{movie.release_year} · {movie.director}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {user ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Perfil</span>
            </Link>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Entrar</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
