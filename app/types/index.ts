export interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  date: Date
  slug: string
  thumb: Media
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
  url: string
}

export interface Media {
  id: string
  sourceUrl: string
}
