import { baseApi } from './base'

export async function getRecipes(options) {
  return await baseApi.get('recipes', options).then((res) => res.data)
}
export function getRecipe(recipeId, options) {
  return baseApi.get(`recipes/${recipeId}`, options).then((res) => res.data)
}
export function createRecipe(data, options) {
  return baseApi.post('recipes', data, options).then((res) => res.data)
}
export function updateRecipe(recipeId, data, options) {
  return baseApi
    .put(`recipes/${recipeId}`, data, options)
    .then((res) => res.data)
}
