export interface IssueG {
  title: string;
  description: string;
  type: "bug" | "feature_request";
  status?: "open" | "closed";
}

export interface authuserFromMiddleware {
  id: number;
  name: string;
  email: string;
}

export interface FilteringIsuues {
  sort?: string;
  type?: string;
  status?: string;
}
