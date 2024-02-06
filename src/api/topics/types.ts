export interface GetTopicsQueries {
  pattern?: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
}
