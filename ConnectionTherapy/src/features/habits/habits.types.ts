export enum HabitCategory {
    SOCIAL = 'social',
    PHYSICAL = 'physical',
    SPIRITUAL = 'spiritual',
    INTELLECTUAL = 'intellectual',
}

export interface Habit {
    id: number
    name: string
    description: string
    duration: string
    category: HabitCategory
    is_completed: boolean
}