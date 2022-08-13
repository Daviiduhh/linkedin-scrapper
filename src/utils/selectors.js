export const $ = (selector, node=document.body) => {
    return node.querySelector(selector);
}

export const $$ = (selector, node=document.body) => {
    return [...node.querySelectorAll(selector)]
}