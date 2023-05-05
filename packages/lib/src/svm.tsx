import React, { createContext, FC, ReactNode, useContext } from "react"

export type Viewports = Record<string, number>

interface SVMContext {
  viewports: Viewports
  delay: number
}

// Set the default values for the SVMContext
const DEFAULT_SVM_CONTEXT: SVMContext = {
  viewports: { sm: 640, md: 768, lg: 1024, xl: 1280 },
  delay: 50, // ms
}

// Create the SVMContext and set its default value to DEFAULT_SVM_CONTEXT
const svmContext = createContext<SVMContext>(DEFAULT_SVM_CONTEXT)

const SVMProvider: FC<{
  value?: Partial<SVMContext>
  children: ReactNode
}> = ({ value = {}, children }) => {
  // Merge the default viewports with any overrides from the value prop
  const viewports = { ...DEFAULT_SVM_CONTEXT.viewports, ...value.viewports }

  // Set the delay value to the overridden value or the default value
  const delay = value.delay ?? DEFAULT_SVM_CONTEXT.delay

  // Render the SVMProvider with the merged viewports and delay
  return (
    <svmContext.Provider value={{ viewports, delay }}>
      {children}
    </svmContext.Provider>
  )
}

// Define a custom hook to access the SVMContext
function useSVMContext(): SVMContext {
  // Get the current SVMContext value
  const context = useContext(svmContext)

  // If the context is undefined, throw an error
  if (!context)
    throw new Error("useSVMContext must be used within a SVMProvider")

  // Otherwise, return the context value
  return context
}

// Export the SVMProvider and the useSVMContext hook
export { SVMProvider, useSVMContext }
