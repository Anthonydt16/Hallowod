import React, { useState } from "react"
import { View, ViewStyle } from "react-native"
import { Button, Screen } from "../components"
interface StepperProps {
  steps: React.ReactNode[]
}

const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Handle submit logic here
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      {steps[currentStep]}
      <View style={$containerButton}>
        {currentStep > 0 && <Button tx="common.previous" onPress={handleBack} />}
        {currentStep < steps.length - 1 ? (
          <Button tx="common.next" onPress={handleNext} />
        ) : (
          <Button tx="common.submit" onPress={handleSubmit} />
        )}
      </View>
    </Screen>
  )
}

export default Stepper

const $screenContentContainer = {
  flex: 1,
}

const $containerButton: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 20,
}
