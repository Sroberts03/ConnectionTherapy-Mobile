export enum HabitCategory {
    SOCIAL = 'Social',
    PHYSICAL = 'Physical',
    SPIRITUAL = 'Spiritual',
    INTELLECTUAL = 'Intellectual',
}

export interface Habit {
    id: number
    name: string
    description: string
    duration: string
    category: HabitCategory
    is_completed: boolean
}

export interface HabitDetails {
    name: string
    description: string
    duration: string
    category: HabitCategory
    repetition: string
    startDate: string
    endDate: string
}
    