import notifee from '@notifee/react-native'
import {useEffect} from 'react'

export const useHomeContainer = () => {
  const displayNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel'
    })

    // Display a notification
    setTimeout(() => {
      notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',
        ios: {badgeCount: 120},
        android: {
          channelId,
          badgeCount: 12,
          smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {id: 'default'}
        }
      })
    }, 1000)
  }
  useEffect(() => {
    notifee.setBadgeCount(0).then()
    return () => {}
  }, [])

  return {displayNotification}
}
