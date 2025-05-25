export interface Post {
  id?: number;
  userName: string;
  title: string;
  body: string;
  createdOn: string;
  modifiedOn?: string;
}

export interface PatchPost {
  id: number;
  userName: string;
  title: string;
  body: string;
  modifiedOn: string;
}
