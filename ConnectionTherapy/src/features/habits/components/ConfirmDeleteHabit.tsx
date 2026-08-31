import { Modal, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { deleteHabit } from "../services/habits.service";
import { formatDate } from "../../../utils/dates";
import { useAuth } from "../../auth/AuthContext";
import { useHabitContext } from "../HabitContext";
import { usePillarContext } from "@features/dashboard/PillarContext";

interface ConfirmDeleteHabitProps {
    isVisible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    date: Date;
    habitId?: number;
}

export default function ConfirmDeleteHabit({ isVisible, onClose, onConfirm, habitId, date }: ConfirmDeleteHabitProps) {
    const { currentHabits, setCurrentHabits, reloadTopHabits, setHabitError } = useHabitContext();
    const { reloadPillarPercentages } = usePillarContext();
    const { user } = useAuth();

    if (habitId === undefined) return null;

    const habitName = currentHabits.get(habitId)?.name || "";

    const handleDelete = async (type: 'future' | 'single') => {
        if (!user) return;
        try {
            await deleteHabit(type, habitId, user.id, formatDate(date));
            const updatedHabits = new Map(currentHabits);
            updatedHabits.delete(habitId);
            setCurrentHabits(updatedHabits);
            reloadTopHabits();
            reloadPillarPercentages();
            onConfirm();
        } catch (e) {
            setHabitError(e instanceof Error ? e.message : "Failed to delete habit")
            onClose();
        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50 p-4">
                <View className="bg-white rounded-[32px] p-6 w-full max-w-sm items-center relative shadow-xl">
                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} className="absolute top-4 right-4 p-2 z-10">
                        <Ionicons name="close" size={24} color="#d1d5db" />
                    </TouchableOpacity>

                    {/* Warning Icon */}
                    <View className="w-16 h-16 rounded-full bg-red-50 items-center justify-center mb-4 mt-2">
                        <Ionicons name="warning-outline" size={32} color="#ef4444" />
                    </View>

                    {/* Title */}
                    <Text className="text-2xl font-bold text-neutral-800 mb-3 text-center">
                        Delete Habit
                    </Text>

                    {/* Description */}
                    <Text className="text-neutral-400 text-center mb-8 px-2 text-base leading-6">
                        Are you sure you want to delete <Text className="font-bold text-neutral-600">"{habitName}"</Text>? This action cannot be undone.
                    </Text>

                    {/* Action Buttons */}
                    <TouchableOpacity
                        onPress={() => handleDelete('future')}
                        className="w-full bg-[#ff3b30] py-4 rounded-2xl mb-3"
                    >
                        <Text className="text-white text-center font-bold text-base">Delete this and all future events</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleDelete('single')}
                        className="w-full bg-red-50 border border-red-100 py-4 rounded-2xl mb-6"
                    >
                        <Text className="text-[#ff3b30] text-center font-bold text-base">Delete just this event</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onClose}
                        className="w-full pb-2 pt-2"
                    >
                        <Text className="text-neutral-400 text-center font-bold text-base">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}