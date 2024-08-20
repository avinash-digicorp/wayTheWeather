import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as service from './service'
import {IProductProps, IProductsStateProps} from './types'
import {IParamsProps} from 'utils/request'

const initialState: IProductsStateProps = {
  products: [],
  fetchingProducts: false
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: IParamsProps) => {
    const response = await service.fetchProducts(params)
    return response
  }
)

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id: number) => {
    const response = await service.fetchProduct(id)
    return response
  }
)

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (data: IProductProps) => {
    const response = await service.addProduct(data)
    return response
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (data: IProductProps) => {
    const response = await service.updateProduct(data.id, data)
    return response
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number) => {
    const response = await service.deleteProduct(id)
    return response
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {resetProductsStore: () => initialState},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.fetchingProducts = true
    }),
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.fetchingProducts = false
      }),
      builder.addCase(fetchProducts.rejected, (state, action) => {
        state.fetchingProducts = false
      }),
      builder.addCase(fetchProduct.pending, (state, action) => {
        state.fetchingProducts = true
      }),
      builder.addCase(fetchProduct.fulfilled, (state, action) => {
        state.products = action.payload
        state.fetchingProducts = false
      }),
      builder.addCase(fetchProduct.rejected, (state, action) => {
        state.fetchingProducts = false
      }),
      builder.addCase(addProduct.fulfilled, (state, action) => {
        state.products = [...state.products, action.payload]
      }),
      builder.addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map(product => {
          if (product.id === action.payload.id) {
            return action.payload
          }
          return product
        })
      }),
      builder.addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          product => product.id !== action.payload
        )
      })
  }
})

export const {resetProductsStore} = productsSlice.actions

export default productsSlice.reducer
