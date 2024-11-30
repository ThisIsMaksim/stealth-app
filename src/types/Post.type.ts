export interface IPost {
  author: IAuthor,
  content: string,
  id: string,
  is_relevant: true,
  last_check_ts: string,
  last_comment: string,
  link_url: string,
  published_ts: string
}

export interface IComment {
  id: string
  content: string,
  status: string
}

export interface IAuthor {
  id: string
  avatar_url: string
  email: string
  is_important: boolean
  link_url: string
  name: string
  position: string
}

export interface IPostWithComment {
  post: IPost,
  comment: IComment,
}