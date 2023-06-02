"use client"
import React, { createContext, FC, ReactNode, useContext } from "react"

export type Viewports = Record<string, number>

interface RecastContext {
  viewports: Viewports
  delay: number
}

// Set the default values for the RecastContext
const DEFAULT_RECAST_CONTEXT: RecastContext = {
  viewports: { sm: 640, md: 768, lg: 1024, xl: 1280 },
  delay: 0, // ms
}

// Create the RecastContext and set its default value to DEFAULT_RECAST_CONTEXT
const recastContext = createContext<RecastContext>(DEFAULT_RECAST_CONTEXT)

const RecastProvider: FC<{
  value?: Partial<RecastContext>
  children: ReactNode
}> = ({ value = {}, children }) => {
  // Merge the default viewports with any overrides from the value prop
  const viewports = { ...DEFAULT_RECAST_CONTEXT.viewports, ...value.viewports }

  // Set the delay value to the overridden value or the default value
  const delay = value.delay ?? DEFAULT_RECAST_CONTEXT.delay

  // Render the RecastProvider with the merged viewports and delay
  return (
    <recastContext.Provider value={{ viewports, delay }}>
      {children}
    </recastContext.Provider>
  )
}

// Define a custom hook to access the RecastContext
function useRecastContext(): RecastContext {
  // Get the current RecastContext value
  const context = useContext(recastContext)

  // If the context is undefined, throw an error
  if (!context)
    throw new Error("useRecastContext must be used within a RecastProvider")

  // Otherwise, return the context value
  return context
}

// Export the RecastProvider and the useRecastContext hook
export { RecastProvider, useRecastContext }
