import {useState} from 'react'

export const useTodo = () => {
     const [loading, setLoading] = useState<boolean>(false)
   
     const onSubmit = (): void => {
       setLoading(true)
       setLoading(false)
     }
   
     const values = {loading}
     const handlers = {setLoading, onSubmit}
   
     return {...values, ...handlers}
   }
   
