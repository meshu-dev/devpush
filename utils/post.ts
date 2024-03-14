import type { Post, PostPaginate } from "@/app/types"
import { format, isAfter } from "date-fns"

export const getTotalPages = (postPaginate: PostPaginate): number => {
  return Math.ceil(postPaginate.meta.total / postPaginate.meta.per_page)
}

export const applyCopyCodeClickEvents = () => {
  document.querySelectorAll('.code-block-pro-copy-button').forEach((el: Element) => {
    let copyBtnElem = el as HTMLElement

    copyBtnElem.style.display = ''
    copyBtnElem.addEventListener('click', () => {
      navigator.clipboard.writeText(el.nextElementSibling?.textContent ?? '')
    })
  })
}

export const getPostDate = (postDate: string) => {
  const date: Date = new Date(postDate)
  return format(date, "MMM d, y")
}


export const isPostUpdated = (post: Post): boolean => {
  return isAfter(new Date(post.updated_at), new Date(post.published_at))
}
