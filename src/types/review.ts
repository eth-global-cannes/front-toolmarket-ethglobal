export interface User {
  id: string;
  name: string;
  avatar: string;
  wallet: string;
  verified?: boolean;
}

export interface Review {
  id: string;
  user: User;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  agentId: number;
}
