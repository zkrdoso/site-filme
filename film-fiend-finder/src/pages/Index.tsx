import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import MovieGrid from "@/components/MovieGrid";
import ReviewCard from "@/components/ReviewCard";
import { MOCK_MOVIES, MOCK_REVIEWS } from "@/data/movies";

const Index = () => {
  const featuredMovie = MOCK_MOVIES[0];
  const popularMovies = MOCK_MOVIES.slice(0, 6);
  const recentMovies = MOCK_MOVIES.slice(6, 12);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection movie={featuredMovie} />

      <main className="container mx-auto px-4">
        <MovieGrid
          movies={popularMovies}
          title="Populares esta semana"
          subtitle="Os filmes mais comentados pela comunidade"
        />

        {/* Recent Reviews */}
        <section className="py-8">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-1">Resenhas recentes</h2>
          <p className="text-muted-foreground text-sm">O que a comunidade está dizendo</p>
          <div className="w-16 h-0.5 bg-primary mt-3 mb-6" />
          <div className="grid md:grid-cols-2 gap-4">
            {MOCK_REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>

        <MovieGrid
          movies={recentMovies}
          title="Clássicos atemporais"
          subtitle="Filmes que moldaram a história do cinema"
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
