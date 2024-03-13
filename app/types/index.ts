export interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  slug: string
  thumbnail: string,
  created_at: string,
  updated_at: string
}

export interface PostPaginate {
  data: Post[]
  meta: {
    per_page: number
    total: number
    page_count: number
  }
}

export interface PostUrl {
  id: number
  slug: string
}

export interface Media {
  id: string
  sourceUrl: string
}

export type PostViewProps =  {
  params: { slug: string }
}
