import { baseApi } from './base'

export function getChefs(options) {
  return baseApi.get('chefs', options).then((res) => res.data)
}
export function getChef(chefId, options) {
  return baseApi.get(`chefs/${chefId}`, options).then((res) => res.data)
}
