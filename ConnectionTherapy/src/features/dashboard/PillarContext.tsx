import { createContext, useContext, useState } from "react";
import { ConnectionPillar } from "./dashboard.types";
import { HabitCategory } from "../habits/habits.types";
import { useSQLiteContext } from "expo-sqlite";
import { useAuth } from "../auth/AuthContext";
import { getDashboardPillars, getFullPillars } from "./services/dashboard.service";

export interface PillarContextType {
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
    const db = useSQLiteContext();
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
                | 'color'
                | 'icon'
            >[] = await getDashboardPillars(session)
            if (pillars.length > 0) {
                setPillars(await getFullPillars(pillars, db))
            }
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
            const updatedPillars = await getFullPillars(Array.from(pillars.values()), db)
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