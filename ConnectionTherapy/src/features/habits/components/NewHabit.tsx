import { Modal, Text, TextInput, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Habit, HabitCategory, HabitDetails } from "../habits.types";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import HabitNameInput from "./HabitNameInput";
import HabitDescInput from "./HabitDescInput";
import HabitDurationInput from "./HabitDurationInput";
import HabitCategorySelector from "./HabitCategorySelector";
import HabitStartEndDateInput from "./HabitStartEndDateInput";
import { createNewHabit, getHabitDetails, updateHabit } from "../services/habits.service";
import { CreationError } from "../errors/CreationError";
import CreationErrorMessage from "./CreationError";
import { useAuth } from "../../auth/AuthContext";
import { parseRepeatString } from "../utils/parseRepeatString";
import { formatDate } from "../../../utils/dates";
import { useHabitContext } from "../HabitContext";
import { newHabitInput } from "../habit.dto";

interface NewHabitProps {
    isVisible: boolean
    onClose: () => void
    date: Date
    category?: HabitCategory
    habitId?: number
}

function habitReturned(
    newHabit: Habit | null, 
    setCurrentHabits: (currentHabits: Map<number, Habit>) => void, 
    currentHabits: Map<number, Habit> 
): void {
    console.log("habitReturned called with newHabit:", newHabit);
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
    if (updatedHabit) {
        const newHabits = new Map(currentHabits);
        newHabits.delete(habitId);
        newHabits.set(updatedHabit.id, updatedHabit);
        setCurrentHabits(newHabits);
    } else {
        const newHabits = new Map(currentHabits);
        newHabits.delete(habitId);
        setCurrentHabits(newHabits);
    }
}

export default function NewHabit({ isVisible, onClose, date, category, habitId }: NewHabitProps) {
    const db = useSQLiteContext();
    const { currentHabits, setCurrentHabits } = useHabitContext();
    const { reloadTopHabits, setHabitError } = useHabitContext();
    const { user } = useAuth();
    const [name, setName] = useState("")
    const [description, setDescription] = useState<string>("")
    const [duration, setDuration] = useState("")
    const [currentCategory, setCurrentCategory] = useState<HabitCategory>(category || HabitCategory.PHYSICAL)
    const [repetition, setRepetition] = useState("None")
    const [customRepetition, setCustomRepetition] = useState<string>("")
    const today = new Date();
    const localDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const [startDate, setStartDate] = useState(localDateStr)
    const [endDate, setEndDate] = useState<string>("")
    const [creationError, setCreationError] = useState<CreationError | null>(null)

    useEffect(() => {
        const fetchHabitInfo = async () => {
            const userId = userIdExists();
            if (!habitId) return;
            const habit: HabitDetails = await getHabitDetails(
                habitId,
                userId,
                db
            )
            const displayString = parseRepeatString(habit.repetition)
            setName(habit.name);
            setDescription(habit.description);
            setDuration(habit.duration);
            setCurrentCategory(habit.category);
            if (displayString === 'custom') {
                setRepetition("custom")
                setCustomRepetition(habit.repetition)
            } else {
                setRepetition(habit.repetition)
            }
            setStartDate(habit.startDate);
            if (habit.endDate) setEndDate(habit.endDate);
        }
        fetchHabitInfo();
    }, [habitId])

    const handleSave = async () => {
        if (habitId) {
            update();
        } else {
            create();
        }
    }

    const userIdExists = (): string => {
        if (!user?.id) {
            throw new Error("User not found. Please log in again.");
        }
        return user.id;
    }

    const update = async () => {
        const userId = userIdExists();
        if (!habitId) return;
        try {
            const req: newHabitInput = {
                userCurrentDate: formatDate(date),
                habitInstanceId: habitId,
                name,
                duration,
                category: currentCategory,
                startDate,
                repetition: repetition == "custom" ? customRepetition : repetition,
                endDate,
                description,
                userId: userId,
                db
            }
            const updatedHabit = await updateHabit(req);
            habitReturnOnUpdate(updatedHabit, setCurrentHabits, currentHabits, habitId);
            reloadTopHabits();
            reset();
        onClose();
        } catch (err) {
            creationErrorHandler(err);
        }
    }

    const create = async () => {
        const userId = userIdExists();

        const req: newHabitInput = {
            userCurrentDate: formatDate(date),
            name,
            duration,
            category: currentCategory,
            startDate,
            repetition: repetition === "custom" ? customRepetition : repetition,
            endDate,
            description,
            userId: userId,
            db,
        };

        try {
            const newHabit = await createNewHabit(req);
            console.log("New habit created:", newHabit);
            habitReturned(newHabit, setCurrentHabits, currentHabits);
            reloadTopHabits();
            reset();
            onClose();
        } catch (err) {
            creationErrorHandler(err);
        }
    };

    const creationErrorHandler = (err: any) => {
        if (err instanceof CreationError) {
            setCreationError(err);
            return;
        }
        setHabitError(err instanceof Error ? err.message : "Error creating new habit");
        reset();
        onClose(); 
    }

    const reset = () => {
        setName("");
        setDescription("");
        setDuration("");
        setCurrentCategory(category || HabitCategory.PHYSICAL);
        setRepetition("None");
        setCustomRepetition("");
        setStartDate(localDateStr);
        setEndDate("");
        setCreationError(null);
    }

    const closeAndReset = () => {
        reset();
        onClose();
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={closeAndReset}
        >
            <View className="flex-1 bg-black/50 justify-center items-center">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="w-11/12 max-h-[90%]"
                >
                    <View className="bg-white rounded-3xl overflow-hidden shadow-xl mb-16">
                        {/* Header */}
                        <View className="flex-row justify-between items-center p-6 border-b border-neutral-100">
                            <Text className="text-xl font-bold text-neutral-800">
                                {habitId ? 'Edit Habit' : `Create New ${currentCategory} Habit`}
                            </Text>
                            <TouchableOpacity onPress={closeAndReset} className="bg-neutral-100 p-2 rounded-full">
                                <Ionicons name="close" size={20} color="#6b7280" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView className="p-6" showsVerticalScrollIndicator={false}>
                            <HabitNameInput
                                name={name}
                                setName={setName}
                            />

                            <CreationErrorMessage
                                error={creationError}
                                place="name"
                                className="text-red-500 text-xs font-medium -mt-2 mb-2"
                            />

                            <HabitDescInput
                                description={description}
                                setDescription={setDescription}
                            />

                            <HabitDurationInput
                                duration={duration}
                                setDuration={setDuration}
                            />

                            <CreationErrorMessage
                                error={creationError}
                                place="duration"
                                className="text-red-500 text-xs font-medium -mt-2 mb-2"
                            />

                            <HabitCategorySelector
                                currentCategory={currentCategory}
                                setCurrentCategory={setCurrentCategory}
                            />

                            <CreationErrorMessage
                                error={creationError}
                                place="category"
                                className="text-red-500 text-xs font-medium -mt-2 mb-2"
                            />

                            <HabitStartEndDateInput
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                                repetition={repetition}
                                setRepetition={setRepetition}
                                setCustomRepetition={setCustomRepetition}
                                creationError={creationError}
                                customRepetition={customRepetition}
                            />

                            {/* Action Buttons */}
                            <View className="flex-row gap-4 mb-6">
                                <TouchableOpacity
                                    onPress={() => {
                                        reset();
                                        onClose();
                                    }}
                                    className="flex-1 bg-neutral-100 py-4 rounded-2xl items-center"
                                >
                                    <Text className="text-neutral-600 font-bold text-base">Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleSave}
                                    className="flex-1 bg-teal-600 py-4 rounded-2xl items-center shadow-sm"
                                >
                                    <Text className="text-white font-bold text-base">Save Habit</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    )
}