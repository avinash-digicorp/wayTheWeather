export type IProductsProps = IProductProps[]

export interface IProductProps {
  id: number
  name: string
  description?: string
  photo?: string
}

export interface IProductsStateProps {
  products: IProductsProps
  fetchingProducts: boolean
}
