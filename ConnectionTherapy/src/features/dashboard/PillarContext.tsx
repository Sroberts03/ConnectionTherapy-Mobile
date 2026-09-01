import { createContext, useContext, useState } from "react";
import { ConnectionPillar } from "./dashboard.types";
import { HabitCategory } from "../habits/habits.types";
import { useAuth } from "../auth/AuthContext";
import { getDashboardPillars, getFullPillars } from "./services/dashboard.service";

interface PillarContextType {
    getPillars: () => Promise<void>
    reloadPillarPercentages: () => Promise<void>
    pillars: Map<HabitCategory, ConnectionPillar>
    setPillars: (pillars: Map<HabitCategory, ConnectionPillar>) => void
    loadingPillars: boolean
    setLoadingPillars: (value: boolean) => void
    pillarError: string
    setPillarError: (error: string) => void
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
    const { session } = useAuth()
    const [pillars, setPillars] = useState<Map<HabitCategory, ConnectionPillar>>(new Map())
    const [loadingPillars, setLoadingPillars] = useState(false)
    const [pillarError, setPillarError] = useState("")

    const getPillars = async () => {
        if (!session) {
            return
        }
        setLoadingPillars(true)
        try {
            const pillars: Pick<
                ConnectionPillar,
                | 'id'
                | 'name'
                | 'lightColor'
                | 'darkColor'
                | 'icon'
            >[] = await getDashboardPillars(session)
            setPillars(await getFullPillars(pillars))
        } catch (error) {
            setPillarError(error instanceof Error ? error.message : "Failed to fetch pillars")
        } finally {
            setLoadingPillars(false)
        }
    }

    const reloadPillarPercentages = async () => {
        if (!session) {
            return
        }
        try {
            setLoadingPillars(true)
            setPillarError("")
            const updatedPillars = await getFullPillars(Array.from(pillars.values()))
            setPillars(updatedPillars)
        } catch (error) {
            setPillarError(error instanceof Error ? error.message : "Failed to reload pillar percentages")
        } finally {
            setLoadingPillars(false)
        }
    }

    return (
        <PillarContext.Provider value={{
            getPillars,
            reloadPillarPercentages,
            pillars,
            setPillars,
            loadingPillars,
            setLoadingPillars,
            pillarError,
            setPillarError
        }}>
            {children}
        </PillarContext.Provider>
    )
}