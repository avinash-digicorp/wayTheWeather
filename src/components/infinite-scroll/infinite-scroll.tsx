import {
  View,
  Text,
  FlatListProps,
  FlatList,
  ActivityIndicator
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {random} from 'lodash'
import {FlashList} from '@shopify/flash-list'
import {styled} from 'nativewind'
import clsx from 'clsx'
import AnimatedListItem from './animated-list-item'
const StyledFlashList = styled(FlashList)

export interface IInfiniteScrollProps extends FlatListProps<any> {
  baseClass?: string
  className?: string
  data: any[]
  limit?: number
}

export const InfiniteScroll = (props: IInfiniteScrollProps) => {
  const {baseClass, limit, renderItem: RenderItem, data, className} = props
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const LIMIT = limit ?? 10

  useEffect(() => {
    const loadInitialData = async () => {
      if (data) {
        setTimeout(() => {
          const slicedItems = data.slice(0, LIMIT)
          if (data.length > LIMIT) setHasMore(true)
          setItems(slicedItems)
          setInitialLoading(false)
        }, 2000)
      } else {
        loadMoreData()
      }
    }

    loadInitialData()
  }, [])

  const loadMoreData = async () => {
    if (loading) return
    if (!hasMore) return
    setLoading(true)
    setTimeout(() => {
      const start = page * LIMIT
      const end = LIMIT * (page + 1)
      setItems(prevItems => [...prevItems, ...data.slice(start, end)])
      setPage(prevPage => prevPage + 1)
      setLoading(false)
      if (data.length <= end) setHasMore(false)
    }, 1000)
  }

  const renderFooter = () => {
    if (!loading) return null
    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  if (initialLoading)
    return (
      <View className={'flex-1 items-center justify-center'}>
        <ActivityIndicator size="large" />
      </View>
    )
  return (
    <View className={clsx('flex-1 w-full', baseClass)}>
      <FlashList
        {...props}
        estimatedItemSize={data?.length}
        data={items}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <AnimatedListItem
            renderItem={RenderItem}
            item={item}
            index={random(0, 1000) + '_' + index}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}
