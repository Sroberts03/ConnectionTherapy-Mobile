import { useEffect, useState } from "react";
import { Habit, HabitCategory, HabitDetails } from "../../habits.types";
import { createNewHabit, getHabitDetails, updateHabit } from "../../services/habits.service";
import { CreationError } from "../../errors/CreationError";
import { useAuth } from "../../../auth/AuthContext";
import { formatDate } from "../../../../utils/dates";
import { useHabitContext } from "../../HabitContext";
import { newHabitInput } from "../../habit.dto";
import { parseRepeatString } from "../../utils/parseRepeatString";
import { usePillarContext } from "../../../dashboard/PillarContext";
import { HabitSuggestion } from "../../utils/habitSuggestions";
import { getHabitFormDefaults } from "../../utils/getHabitFormDefaults";

function habitReturned(
    newHabit: Habit | null,
    setCurrentHabits: (currentHabits: Map<number, Habit>) => void,
    currentHabits: Map<number, Habit>
): void {
    if (newHabit) {
        setCurrentHabits(new Map(currentHabits).set(newHabit.id, newHabit));
    }
}

function habitReturnOnUpdate(
    updatedHabit: Habit | null,
    setCurrentHabits: (currentHabits: Map<number, Habit>) => void,
    currentHabits: Map<number, Habit>,
    habitId: number
): void {
    const newHabits = new Map(currentHabits);
    newHabits.delete(habitId);
    if (updatedHabit) newHabits.set(updatedHabit.id, updatedHabit);
    setCurrentHabits(newHabits);
}

function todayLocalDateStr(): string {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

export function useHabitForm(date: Date, category: HabitCategory | undefined, habitId: number | undefined, isVisible: boolean, onClose: () => void, suggestion?: HabitSuggestion) {
    const { currentHabits, setCurrentHabits, reloadTopHabits, setHabitError } = useHabitContext();
    const { reloadPillarPercentages } = usePillarContext();
    const { user } = useAuth();
    const localDateStr = todayLocalDateStr();

    const [name, setName] = useState("");
    const [description, setDescription] = useState<string | null>(null);
    const [duration, setDuration] = useState("");
    const [currentCategory, setCurrentCategory] = useState<HabitCategory>(category || HabitCategory.PHYSICAL);
    const [repetition, setRepetition] = useState("None");
    const [customRepetition, setCustomRepetition] = useState("");
    const [startDate, setStartDate] = useState(localDateStr);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [creationError, setCreationError] = useState<CreationError | null>(null);

    const reset = () => {
        const defaults = getHabitFormDefaults(category, suggestion);
        setName(defaults.name);
        setDescription(null);
        setDuration(defaults.duration);
        setCurrentCategory(defaults.category);
        setRepetition("None");
        setCustomRepetition("");
        setStartDate(localDateStr);
        setEndDate(null);
        setCreationError(null);
    };

    // Reset as the sheet opens, not as it closes, so the fields never visibly clear mid-fade.
    // A tapped suggestion pre-fills the form; the user can still change anything
    useEffect(() => {
        if (isVisible && !habitId) reset();
    }, [isVisible, suggestion]);

    const userIdExists = (): string => {
        if (!user?.id) throw new Error("User not found. Please log in again.");
        return user.id;
    };

    const creationErrorHandler = (err: unknown) => {
        if (err instanceof CreationError) {
            setCreationError(err);
            return;
        }
        setHabitError(err instanceof Error ? err.message : "Error creating new habit");
        onClose();
    };

    const loadHabitIntoForm = async (id: number) => {
        const userId = userIdExists();
        const habit: HabitDetails = await getHabitDetails(id, userId);
        const isCustom = parseRepeatString(habit.repetition) === 'custom';

        setName(habit.name);
        setDescription(habit.description);
        setDuration(habit.duration);
        setCurrentCategory(habit.category);
        setRepetition(isCustom ? "custom" : habit.repetition);
        setCustomRepetition(isCustom ? habit.repetition : "");
        setStartDate(habit.startDate);
        setEndDate(habit.endDate ?? "");
    };

    useEffect(() => {
        if (habitId) loadHabitIntoForm(habitId);
    }, [habitId]);

    const buildRequest = (): newHabitInput => ({
        userCurrentDate: formatDate(date),
        name,
        duration,
        category: currentCategory,
        startDate,
        repetition: repetition === "custom" ? customRepetition : repetition,
        endDate,
        description,
        userId: userIdExists(),
    });

    const create = async () => {
        try {
            const newHabit = await createNewHabit(buildRequest());
            habitReturned(newHabit, setCurrentHabits, currentHabits);
            reloadTopHabits();
            reloadPillarPercentages();
            onClose();
        } catch (err) {
            creationErrorHandler(err);
        }
    };

    const update = async () => {
        if (!habitId) return;
        try {
            const updatedHabit = await updateHabit({ ...buildRequest(), habitInstanceId: habitId });
            habitReturnOnUpdate(updatedHabit, setCurrentHabits, currentHabits, habitId);
            reloadTopHabits();
            onClose();
        } catch (err) {
            creationErrorHandler(err);
        }
    };

    const handleSave = () => (habitId ? update() : create());

    return {
        name, setName, description, setDescription, duration, setDuration,
        currentCategory, setCurrentCategory, repetition, setRepetition,
        customRepetition, setCustomRepetition, startDate, setStartDate,
        endDate, setEndDate, creationError, handleSave, close: onClose,
    };
}