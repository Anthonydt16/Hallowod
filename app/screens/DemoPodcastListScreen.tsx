import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { View, ViewStyle } from "react-native"
import { type ContentStyle } from "@shopify/flash-list"
import { Button, ListView, Screen, Text } from "../components"
import { useStores } from "../models"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import { User } from "app/models/User"

export const DemoPodcastListScreen: FC<DemoTabScreenProps<"DemoPodcastList">> = observer(
  function DemoPodcastListScreen(_props) {
    const { userStore, authenticationStore } = useStores()
    const [refreshing, setRefreshing] = React.useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setIsLoading] = React.useState(false)

    const { navigation } = _props
    // initially, kick off a background refresh without the refreshing UI

    function goNext() {
      navigation.navigate("Bottom", { screen: "HomeAdmin" })
    }
    useEffect(() => {
      ;(async function load() {
        console.log("loading")
        setIsLoading(true)
        if (authenticationStore.isAuthenticated) {
          await userStore.fetchUsers(authenticationStore.authToken ?? "")
        }
        setIsLoading(false)
      })()
    }, [userStore])

    // simulate a longer refresh, if the refresh is too fast for UX
    async function manualRefresh() {
      setRefreshing(true)
      console.log("refreshing")
      if (authenticationStore.isAuthenticated) {
        await userStore.fetchUsers(authenticationStore.authToken ?? "")
        console.log("userStore.users", userStore.users)
      }
      setRefreshing(false)
    }

    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContentContainer}
      >
        <ListView<User>
          contentContainerStyle={$listContentContainer}
          data={userStore.users}
          extraData={userStore.users.length}
          refreshing={refreshing}
          estimatedItemSize={177}
          onRefresh={manualRefresh}
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="heading" tx="demoPodcastListScreen.title" />
            </View>
          }
          renderItem={({ item }) => (
            <Text text={item.fullName + " " + item.email + " " + item.role} />
          )}
        />
        {authenticationStore.isAdmin && (
          <Button
            testID="next-screen-button"
            preset="reversed"
            tx="welcomeScreen.letsGo"
            onPress={goNext}
          />
        )}
      </Screen>
    )
  },
)
// #region Styles
const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.md,
}

// #endregion
