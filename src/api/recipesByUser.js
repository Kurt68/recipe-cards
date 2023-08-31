import { baseApi } from './base'

export function getRecipesByUser(chefId, options) {
  return baseApi.get(`chefs/${chefId}/recipes`, options).then((res) => res.data)
}
