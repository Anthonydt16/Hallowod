/* eslint-disable react/react-in-jsx-scope */
import { spacing } from "app/theme"
import { Button, Icon, Screen, Text, TextField } from "../../components"
import { Image, ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
export interface ContestFormProps {}

export const ContestForm: FC<ContestFormProps> = observer(function ContestForm() {
  const [nameContest, setNameContest] = useState<string>("")
  const [descriptionContest, setDescriptionContest] = useState<string>("")
  const [logoUri, setLogoUri] = useState<string | null>(null)

  async function requestPermission() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!")
      return false
    }
    return true
  }

  const handleSelectLogo = async () => {
    const permission = await requestPermission()
    if (!permission) return
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setLogoUri(result.assets[0].uri)
    }
  }
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <Text preset="heading" tx="addContest.title" style={$title} />
      <Text preset="subheading" tx="addContest.subtitle" style={$subtitle} />
      <Text preset="subheading" tx="addContest.titleForm" style={$subtitle} />
      <View style={$contentChoiceLogo}>
        {!logoUri && (
          <Button tx="addContest.addImage" style={$tapButton} onPress={handleSelectLogo} />
        )}

        {logoUri && (
          <Pressable style={$logoRender} onPress={handleSelectLogo}>
            <Image source={{ uri: logoUri }} style={$logoStyle} />
            <Icon
              onPress={() => setLogoUri(null)}
              icon="x"
              color="red"
              size={30}
              style={$deleteIcon}
            />
          </Pressable>
        )}
      </View>
      <View style={$containerNameDescription}>
        <TextField
          labelTx={"addContest.nameContest"}
          placeholderTx="addContest.nameContest"
          value={nameContest}
          onChangeText={setNameContest}
          autoCorrect={false}
          containerStyle={$containerStyleTextField}
        />
        <TextField
          labelTx={"addContest.descriptionContest"}
          placeholderTx="addContest.descriptionContest"
          value={descriptionContest}
          onChangeText={setDescriptionContest}
          multiline={true}
          containerStyle={$containerStyleTextField}
        />
      </View>
    </Screen>
  )
})

// #region Styles
const $screenContentContainer: ViewStyle = {
  flex: 1,
  marginHorizontal: spacing.xs,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
  marginTop: spacing.lg,
  marginHorizontal: spacing.lg,
}

const $subtitle: TextStyle = {
  marginHorizontal: spacing.lg,
}

const $tapButton: ViewStyle = {
  width: 100,
  height: 100,
  borderRadius: 50,
  marginHorizontal: spacing.lg,
  marginTop: spacing.lg,
}

const $logoStyle: ImageStyle = {
  width: 100,
  height: 100,
  borderRadius: 50,
}

const $logoRender: ViewStyle = {
  width: 100,
  height: 100,
  borderRadius: 50,
  marginHorizontal: spacing.lg,
  marginTop: spacing.lg,
}

const $contentChoiceLogo: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}

const $containerNameDescription: ViewStyle = {
  marginHorizontal: spacing.lg,
  marginTop: spacing.lg,
}

const $containerStyleTextField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $deleteIcon: ImageStyle = {
  position: "absolute",
  top: -110,
  right: -10,
}
