interface RequestUser {
  id: string;
  name: string;
  age: number;
  score: number;
  iat: number;
}

// augment Request object
declare namespace Express {
  export interface Request {
    currentUser?: RequestUser;
  }
}
