import { BottomTabScreenPropsAppStackScreenProps } from "app/navigators/BottomNavigator"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Screen, Text } from "../components"
import { ViewStyle } from "react-native"

export const HomeAdminScreen: FC<BottomTabScreenPropsAppStackScreenProps<"HomeAdmin">> = observer(
  function HomeAdminScreen(_props) {
    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContentContainer}
      >
        <Text>Home Admin</Text>
      </Screen>
    )
  },
)

// #region Styles
const $screenContentContainer: ViewStyle = {
  flex: 1,
}
