export interface Agent {
  id: number;
  image: string;
  title: string;
  description: string;
  rating: number;
  votes: number;
  price?: string;
  type?: string;
  developer?: string;
  releaseDate?: string;
  category?: string;
  longDescription?: string;
  isPurchased?: boolean;
}
