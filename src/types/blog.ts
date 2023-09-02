export type Post = {
  id: string;
  title: string;
  overview: string;
  comment: string;
  credit: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
    blurDataURL: string;
  };
  images: Image[];
  roles: string[];
  outputs: string[];
  createdAt: string;
  updatedAt: string;
  revisedAt: string;
  publishedAt: string;
};

export type Image = {
  url: string;
  height: number;
  width: number;
  blurDataURL: string;
};
