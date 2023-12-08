export interface PostUri {
  cursor: string
  node: {
    id: string
    date: Date
    uri: string
  }
}

export interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  date: Date
  uri: string
  thumb: Media
}

export interface Media {
  id: string
  sourceUrl: string
}
