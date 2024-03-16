import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { FormAddContestTabScreenPropsAppStackScreenProps } from "app/navigators/FormAddContestNavigator"
import Stepper from "app/components/Stepper"
import { Screen, Text } from "../../components"
import { spacing } from "app/theme"
import { ViewStyle } from "react-native"
import { ContestForm } from "../form/ContestForm"
import { CategoryForm } from "../form/AddCategory"

export const AddContestScreen: FC<FormAddContestTabScreenPropsAppStackScreenProps<"AddContest">> =
  observer(function AddContestScreen(_props) {
    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContentContainer}
      >
        <Stepper
          steps={[<ContestForm key={1} />, <CategoryForm key={2} />, <Text key={3}>Step 3</Text>]}
        />
      </Screen>
    )
  })

const $screenContentContainer: ViewStyle = {
  flex: 1,
  marginHorizontal: spacing.xs,
}
