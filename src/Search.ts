export interface Search {
  term: string;
}

export interface PaginationAndAuthor {
  author: string;
  after: number;
  count: number;
}
