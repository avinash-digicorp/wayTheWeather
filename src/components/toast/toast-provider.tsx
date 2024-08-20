import type {PropsWithChildren} from 'react'
import React, {useCallback, useMemo, useState} from 'react'
import {ToastContext, type ToastType} from './context'
import {Toast} from './toast'

export const ToastProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [toasts, setToasts] = useState<ToastType[]>([])
  const TOAST_LIMIT = 4
  const onDismiss = useCallback((toastId: number) => {
    setToasts(prev => {
      return prev
        .map(item => {
          if (item.id === toastId) {
            return null
          }

          if (item.id > toastId) {
            return {
              ...item,
              id: item.id - 1
            }
          }

          return item
        })
        .filter(Boolean) as ToastType[]
    })
  }, [])
  const showToast = useCallback(
    (toast: Omit<ToastType, 'id'>) => {
      if (toasts.length > TOAST_LIMIT) {
        setToasts(prev => prev.filter(i => i.id < TOAST_LIMIT))
        setTimeout(() => {
          showToast(toast)
        }, 1000)
        return
      }
      setToasts(prev => {
        const updatedPrev = prev.map(item => {
          return {...item, leading: item.leading, id: item.id + 1}
        })
        const toasts = [...updatedPrev, {...toast, id: 0}]
        return toasts
      })
      // setTimeout(() => {
      //   onDismiss(0)
      // }, 5000)
    },
    [toasts]
  )

  const sortedToasts = useMemo(() => {
    return toasts.sort((a, b) => a.id - b.id)
  }, [toasts])

  const value = useMemo(() => {
    return {
      showToast
    }
  }, [showToast])

  return (
    <>
      <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
      {sortedToasts.map((toast, index) => {
        const textKey = typeof toast.title === 'string' ? toast.title : toast.id
        const key = toast.key || textKey
        return (
          <Toast key={key} toast={toast} index={index} onDismiss={onDismiss} />
        )
      })}
    </>
  )
}
