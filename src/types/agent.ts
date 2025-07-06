export interface Agent {
  id: string | number;
  name: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  votes: number;
  price: string;
  type: string;
  developer: string;
  releaseDate: string;
  category: string;
  isPurchased: boolean;
  longDescription: string;
}
