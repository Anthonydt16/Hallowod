import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Screen, Text } from "../../components"
import { TextStyle, ViewStyle } from "react-native"
import { spacing } from "app/theme"
import { FormAddContestTabScreenPropsAppStackScreenProps } from "app/navigators/FormAddContestNavigator"

export const AddContestScreen: FC<FormAddContestTabScreenPropsAppStackScreenProps<"AddContest">> = observer(
  function HomeAdminScreen(_props) {
    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContentContainer}
      >
        <Text preset="heading" tx="addContest.title" style={$title} />
        <Text preset="subheading" tx="addContest.subtitle" style={$subtitle} />
        
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
