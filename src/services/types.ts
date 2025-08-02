export type UserSearchItem = {
  login: string;
  id: number;
  avatar_url: string;
};

export type SearchUsersResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: UserSearchItem[];
};

export type UserDetail = {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  html_url: string;
  avatar_url: string;
};
