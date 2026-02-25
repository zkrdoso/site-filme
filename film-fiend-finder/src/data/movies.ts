export interface Movie {
  id: number;
  tmdb_id: number;
  title: string;
  overview: string;
  poster_url: string;
  backdrop_url: string;
  release_year: number;
  director: string;
  genres: string[];
  rating: number;
  vote_count: number;
}

export interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  movie_id: number;
  rating: number;
  review_text: string;
  has_spoilers: boolean;
  created_at: string;
}

export const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    tmdb_id: 550,
    title: "Fight Club",
    overview: "A ticking-Loss insurance employee and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    poster_url: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_url: "https://image.tmdb.org/t/p/original/hZkgoQYus5dXo3H8T7Uef6DNknx.jpg",
    release_year: 1999,
    director: "David Fincher",
    genres: ["Drama", "Thriller"],
    rating: 4.3,
    vote_count: 28456,
  },
  {
    id: 2,
    tmdb_id: 680,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster_url: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_url: "https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    release_year: 1994,
    director: "Quentin Tarantino",
    genres: ["Thriller", "Crime"],
    rating: 4.4,
    vote_count: 26789,
  },
  {
    id: 3,
    tmdb_id: 13,
    title: "Forrest Gump",
    overview: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    poster_url: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop_url: "https://image.tmdb.org/t/p/original/ghgfzbEV7kbpbi1O3aOGzpIfVmt.jpg",
    release_year: 1994,
    director: "Robert Zemeckis",
    genres: ["Comedy", "Drama", "Romance"],
    rating: 4.2,
    vote_count: 25876,
  },
  {
    id: 4,
    tmdb_id: 155,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and DA Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    poster_url: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911kpUpMurC85z9.jpg",
    backdrop_url: "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5ez.jpg",
    release_year: 2008,
    director: "Christopher Nolan",
    genres: ["Drama", "Action", "Crime", "Thriller"],
    rating: 4.3,
    vote_count: 31245,
  },
  {
    id: 5,
    tmdb_id: 278,
    title: "The Shawshank Redemption",
    overview: "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.",
    poster_url: "https://image.tmdb.org/t/p/w500/9cjIGRQL0GkMBMbAOWlyaLTktfL.jpg",
    backdrop_url: "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    release_year: 1994,
    director: "Frank Darabont",
    genres: ["Drama", "Crime"],
    rating: 4.7,
    vote_count: 25678,
  },
  {
    id: 6,
    tmdb_id: 27205,
    title: "Inception",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life as payment for a task considered to be impossible.",
    poster_url: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop_url: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    release_year: 2010,
    director: "Christopher Nolan",
    genres: ["Action", "Science Fiction", "Adventure"],
    rating: 4.2,
    vote_count: 35432,
  },
  {
    id: 7,
    tmdb_id: 238,
    title: "The Godfather",
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
    poster_url: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_url: "https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    release_year: 1972,
    director: "Francis Ford Coppola",
    genres: ["Drama", "Crime"],
    rating: 4.6,
    vote_count: 19876,
  },
  {
    id: 8,
    tmdb_id: 157336,
    title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.",
    poster_url: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_url: "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK1DVfjko.jpg",
    release_year: 2014,
    director: "Christopher Nolan",
    genres: ["Adventure", "Drama", "Science Fiction"],
    rating: 4.3,
    vote_count: 33567,
  },
  {
    id: 9,
    tmdb_id: 769,
    title: "GoodFellas",
    overview: "The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighbourhood gangsters at an early age and grows up among them.",
    poster_url: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    backdrop_url: "https://image.tmdb.org/t/p/original/sw7mordbZxgITU877yTpZCud90M.jpg",
    release_year: 1990,
    director: "Martin Scorsese",
    genres: ["Drama", "Crime"],
    rating: 4.3,
    vote_count: 12345,
  },
  {
    id: 10,
    tmdb_id: 496243,
    title: "Parasite",
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get intertwined in an unexpected incident.",
    poster_url: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop_url: "https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    release_year: 2019,
    director: "Bong Joon-ho",
    genres: ["Comedy", "Thriller", "Drama"],
    rating: 4.3,
    vote_count: 16789,
  },
  {
    id: 11,
    tmdb_id: 244786,
    title: "Whiplash",
    overview: "Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity.",
    poster_url: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    backdrop_url: "https://image.tmdb.org/t/p/original/6uLhSLXzB1ooJ3522ydrBZ2Hh0W.jpg",
    release_year: 2014,
    director: "Damien Chazelle",
    genres: ["Drama", "Music"],
    rating: 4.3,
    vote_count: 14567,
  },
  {
    id: 12,
    tmdb_id: 120,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    overview: "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator.",
    poster_url: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    backdrop_url: "https://image.tmdb.org/t/p/original/pIUvQ9Ed35wlWhY2oU6OmwEgzx.jpg",
    release_year: 2001,
    director: "Peter Jackson",
    genres: ["Adventure", "Fantasy", "Action"],
    rating: 4.4,
    vote_count: 23456,
  },
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    user: { name: "cinephile_ana", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana" },
    movie_id: 1,
    rating: 4.5,
    review_text: "Uma obra-prima que desafia as convenções. Fincher criou algo que vai muito além do que parece na superfície. A revelação final continua impactante mesmo após múltiplas revisitas.",
    has_spoilers: false,
    created_at: "2025-02-20",
  },
  {
    id: "2",
    user: { name: "marcos_filme", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcos" },
    movie_id: 2,
    rating: 5.0,
    review_text: "Tarantino no seu melhor. Os diálogos são afiados, a estrutura narrativa é brilhante e cada cena é memorável. Cinema em estado puro.",
    has_spoilers: false,
    created_at: "2025-02-18",
  },
  {
    id: "3",
    user: { name: "julia_reviews", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=julia" },
    movie_id: 5,
    rating: 5.0,
    review_text: "O filme mais esperançoso já feito sobre perseverança humana. Tim Robbins e Morgan Freeman entregam performances que transcendem a tela.",
    has_spoilers: false,
    created_at: "2025-02-15",
  },
  {
    id: "4",
    user: { name: "pedro_cinema", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pedro" },
    movie_id: 10,
    rating: 4.5,
    review_text: "Bong Joon-ho criou uma sátira social perfeita. A transição de comédia para thriller é magistral. Mereceu cada prêmio que recebeu.",
    has_spoilers: false,
    created_at: "2025-02-12",
  },
  {
    id: "5",
    user: { name: "carol_movies", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol" },
    movie_id: 6,
    rating: 4.0,
    review_text: "Nolan expandiu os limites do cinema blockbuster. A fotografia é deslumbrante e Hans Zimmer entregou uma trilha sonora inesquecível.",
    has_spoilers: false,
    created_at: "2025-02-10",
  },
];
