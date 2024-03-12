import type { PostPaginate } from "@/app/types"

export const getTotalPages = (postPaginate: PostPaginate): number => {
  return Math.ceil(postPaginate.meta.total / postPaginate.meta.per_page)
}
