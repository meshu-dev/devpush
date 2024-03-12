import type { PostPaginate } from "@/app/types"

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
