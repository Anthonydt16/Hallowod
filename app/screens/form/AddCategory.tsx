/* eslint-disable react/react-in-jsx-scope */
import { spacing } from "app/theme"
import { Button, Screen, Text, TextField } from "../../components"
import { FlatList, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
export interface CategoryFormProps {}
export interface CategoryItemProps {
  category: string
  description: string
}
// fais un composant de categoryItem
const CategoryItem: FC<CategoryItemProps> = observer(function CategoryItem({
  category,
  description,
}) {
  console.log(category, description)
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <TextField placeholder="Name Category" />
      <TextField placeholder="Description Category" />
    </Screen>
  )
})

export const CategoryForm: FC<CategoryFormProps> = observer(function CategoryForm() {
  const [category, setCategory] = useState<any[]>([])
  const handleAddCategory = () => {
    // Créez un nouveau tableau avec les valeurs existantes plus la nouvelle catégorie
    const newCategory = [...category, { category: "test", description: "test" }]
    setCategory(newCategory)
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <Text preset="heading" tx="addContest.titleAddCategory" style={$title} />
      {/* parcourir dans une flatlist */}
      <FlatList
        data={category}
        renderItem={({ item }) => (
          <CategoryItem category={item.category} description={item.description} />
        )}
        keyExtractor={(item) => item.category}
      />
      <Button tx="common.add" onPress={handleAddCategory} />
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
