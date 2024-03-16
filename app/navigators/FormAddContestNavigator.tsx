import { StackScreenProps, createStackNavigator } from "@react-navigation/stack"

import { CompositeScreenProps } from "@react-navigation/native"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import Config from "app/config"
import { ErrorBoundary } from "app/screens"
import { AddContestScreen } from "app/screens/admin/AddContestScreen"

export type FormAddContestTabParamList = {
  AddContest: undefined
}
export type FormAddContestTabScreenPropsAppStackScreenProps<
  T extends keyof FormAddContestTabParamList,
> = CompositeScreenProps<
  StackScreenProps<FormAddContestTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Stack = createStackNavigator<FormAddContestTabParamList>()

export function FormAddContestNavigator() {
  return (
    <ErrorBoundary catchErrors={Config.catchErrors}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AddContest" component={AddContestScreen} />
      </Stack.Navigator>
    </ErrorBoundary>
  )
}
