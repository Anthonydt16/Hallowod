import { BottomTabScreenPropsAppStackScreenProps } from "app/navigators/BottomNavigator"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Button, Screen, Text } from "../../components"
import { TextStyle, ViewStyle } from "react-native"
import { spacing } from "app/theme"

export const HomeAdminScreen: FC<BottomTabScreenPropsAppStackScreenProps<"HomeAdmin">> = observer(
  function HomeAdminScreen(_props) {
    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContentContainer}
      >
        <Text preset="heading" tx="homeAdmin.title" style={$title} />
        <Text preset="subheading" tx="homeAdmin.subtitle" style={$subtitle} />
        <Button
          tx="homeAdmin.addContest"
          style={ $addContestButton }
          preset="reversed"
          />
      </Screen>
    )
  },
)

// #region Styles
const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
  marginTop: spacing.lg,
  marginHorizontal: spacing.lg,
}

const $subtitle: TextStyle = {
  marginHorizontal: spacing.lg,
}

const $addContestButton: ViewStyle = {
  marginHorizontal: spacing.lg,
  marginTop: spacing.lg,
}
