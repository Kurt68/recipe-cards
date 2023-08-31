import { baseApi } from './base'

export function getComments(recipeId, options) {
  return baseApi
    .get(`recipes/${recipeId}/comments`, options)
    .then((res) => res.data)
}
