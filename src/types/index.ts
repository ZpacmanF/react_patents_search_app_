export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface Patent {
  _id: string;
  name: string;
  description: string;
  category: string;
  createdBy: string;
  createdAt: string;
}
