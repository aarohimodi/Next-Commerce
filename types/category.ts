export interface ICategory {
  name: string;
  description: string;
  image: {
    url: string;
    public_id: string;
  };
  createdBy: string;
}
export interface CategoryResponse {
  _id: string;
  name: string;
  image: {
    url: string;
    public_id: string;
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
