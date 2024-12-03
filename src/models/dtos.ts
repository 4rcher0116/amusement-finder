export interface Park {
  parkName: string;
  parkLocation: string;
  parkId: string;
  parkLocationId: string;
}

export interface Location {
  id: string;
  name: string;
}

export interface ReviewRequest {
  id: string;
  review: string;
  userId: string;
  ratingScore: number;
  themeParkId: string;
  themeParkLocationId: string;
}

export interface ReviewResponse {
  id: string;
  review: string;
  userId: string;
  ratingScore: number;
  themeParkId: string;
  themeParkLocationId: string;
}


export interface UserDto {
  id: string; 
  userName: string;
  password: string;
}

