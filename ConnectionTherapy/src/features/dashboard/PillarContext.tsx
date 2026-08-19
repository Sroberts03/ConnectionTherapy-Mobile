import { createContext, useContext, useState } from "react";

export interface PillarContextType {
    reloadPillars: boolean
    setReloadPillars: (value: boolean) => void
}

const PillarContext = createContext<PillarContextType | null>(null)

export function usePillarContext() {
    const context = useContext(PillarContext)
    if (context === null) {
        throw new Error("usePillarContext must be used within PillarProvider")
    }
    return context
}

export function PillarProvider({ children }: { children: React.ReactNode }) {
    const [reloadPillars, setReloadPillars] = useState(false)

    return (
        <PillarContext.Provider value={{ reloadPillars, setReloadPillars }}>
            {children}
        </PillarContext.Provider>
    )
}