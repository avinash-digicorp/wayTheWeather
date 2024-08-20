import Request, {IParamsProps} from 'utils/request'
import {IProductProps} from './types'

export const fetchProducts = (query: IParamsProps) =>
  Request.get(`/products?${query}`)

export const fetchProduct = (id: number) => Request.get(`/products/${id}`)

export const addProduct = (data: IProductProps) =>
  Request.post(`/products`, data)

export const updateProduct = (id: number, data: IProductProps) =>
  Request.put(`/products/${id}`, data)

export const deleteProduct = (id: number) =>
  Request.delete(`/products/${id}`, {})
