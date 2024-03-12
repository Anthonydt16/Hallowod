import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import Config from "app/config"
import { ErrorBoundary } from "app/screens"
import { FormAddContestNavigator } from "app/navigators/FormAddContestNavigator"
import { HomeAdminScreen } from "app/screens/admin/HomeAdminScreen"

export type BottomTabParamList = {
  HomeAdmin: undefined
  FormAddContestNavigator: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type BottomTabScreenPropsAppStackScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >

const Tab = createBottomTabNavigator<BottomTabParamList>()

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `DemoNavigator`.
 */
export function BottomNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <ErrorBoundary catchErrors={Config.catchErrors}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: [$tabBar, { height: bottom + 70 }],
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.text,
          tabBarLabelStyle: $tabBarLabel,
          tabBarItemStyle: $tabBarItem,
        }}
      >
        <Tab.Screen
          name="HomeAdmin"
          component={HomeAdminScreen}
          options={{
            tabBarLabel: "Home Admin",

            // tabBarLabel: translate("bottomTabNavigator.homeAdmin"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="components" color={focused ? colors.tint : undefined} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="FormAddContestNavigator"
          component={FormAddContestNavigator}
          options={{
            // tabBarLabel: translate("bottomTabNavigator.homeAdmin"),
            tabBarLabel: "add contest",
            tabBarIcon: ({ focused }) => (
              <Icon icon="components" color={focused ? colors.tint : undefined} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    </ErrorBoundary>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
