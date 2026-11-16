export interface IProducts {
  _id?: string;
  title: string;

  price: number;
  oldPrice?: number;
  description: string;
  images: {
    url: string;
    public_id: string;
  }[];
  category:
    | string
    | {
        _id: string;
        name: string;
      };
  stock: number;

  newArrival?: boolean;
  onSale?: boolean;
  // Backend generated
  slug?: string;
  rating?: number;
  createdBy?: string;
}
