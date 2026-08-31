export enum HabitCategory {
    SOCIAL = 'Social',
    PHYSICAL = 'Physical',
    SPIRITUAL = 'Spiritual',
    INTELLECTUAL = 'Intellectual',
}

export interface Habit {
    id: number
    name: string
    description: string | null
    duration: string
    category: HabitCategory
    isCompleted: boolean
    completedOn: string | null
}

export interface HabitDetails {
    id: number
    name: string
    description: string | null
    duration: string
    category: HabitCategory
    repetition: string
    startDate: string
    endDate: string | null
}
    