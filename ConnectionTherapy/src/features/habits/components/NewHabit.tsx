import { Modal, Text, TextInput, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Habit, HabitCategory, HabitDetails } from "../habits.types";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";

interface NewHabitProps {
    isVisible: boolean
    onClose: () => void
    category?: HabitCategory
    habitId?: number
}

export default function NewHabit({ isVisible, onClose, category, habitId }: NewHabitProps) {
    const db = useSQLiteContext();
    const [habit, setHabit] = useState<HabitDetails | undefined>(undefined);
    const [name, setName] = useState(habit?.name || "")
    const [description, setDescription] = useState(habit?.description || "")
    const [duration, setDuration] = useState(habit?.duration || "")
    const [currentCategory, setCurrentCategory] = useState<HabitCategory>(category || habit?.category || HabitCategory.PHYSICAL)
    const [repetition, setRepetition] = useState(habit?.repetition || "")
    const today = new Date();
    const localDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const [startDate, setStartDate] = useState(habit?.startDate || localDateStr)
    const [endDate, setEndDate] = useState(habit?.endDate || localDateStr)


    const categories = Object.values(HabitCategory)

    useEffect(() => {
        if (!habitId) return;

            
    },[habitId])

    const handleSave = () => {
        // TODO: Save logic
        onClose();
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50 justify-center items-center">
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                    className="w-11/12 max-h-[90%]"
                >
                    <View className="bg-white rounded-3xl overflow-hidden shadow-xl">
                        {/* Header */}
                        <View className="flex-row justify-between items-center p-6 border-b border-neutral-100">
                            <Text className="text-xl font-bold text-neutral-800">
                                {habit ? 'Edit Habit' : `Create New ${currentCategory} Habit`}
                            </Text>
                            <TouchableOpacity onPress={onClose} className="bg-neutral-100 p-2 rounded-full">
                                <Ionicons name="close" size={20} color="#6b7280" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView className="p-6" showsVerticalScrollIndicator={false}>
                            {/* Name Input */}
                            <View className="mb-5">
                                <Text className="text-sm font-semibold text-neutral-600 mb-2 ml-1">Habit Name</Text>
                                <TextInput 
                                    className="bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-4 text-base text-neutral-800"
                                    placeholder="e.g. Read a book"
                                    placeholderTextColor="#9ca3af"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>

                            {/* Description Input */}
                            <View className="mb-5">
                                <Text className="text-sm font-semibold text-neutral-600 mb-2 ml-1">Description (Optional)</Text>
                                <TextInput 
                                    className="bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-4 text-base text-neutral-800"
                                    placeholder="e.g. Read 10 pages before bed"
                                    placeholderTextColor="#9ca3af"
                                    value={description}
                                    onChangeText={setDescription}
                                    multiline
                                />
                            </View>

                            {/* Duration Input */}
                            <View className="mb-5">
                                <Text className="text-sm font-semibold text-neutral-600 mb-2 ml-1">Duration / Goal</Text>
                                <TextInput 
                                    className="bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-4 text-base text-neutral-800"
                                    placeholder="e.g. 30 mins, 1 chapter"
                                    placeholderTextColor="#9ca3af"
                                    value={duration}
                                    onChangeText={setDuration}
                                />
                            </View>

                            {/* Category Selector */}
                            <View className="mb-8">
                                <Text className="text-sm font-semibold text-neutral-600 mb-3 ml-1">Category</Text>
                                <View className="flex-row flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <TouchableOpacity 
                                            key={cat}
                                            onPress={() => setCurrentCategory(cat)}
                                            className={`px-4 py-2.5 rounded-full border ${currentCategory === cat ? 'bg-teal-600 border-teal-600' : 'bg-neutral-50 border-neutral-200'}`}
                                        >
                                            <Text className={`capitalize font-semibold ${currentCategory === cat ? 'text-white' : 'text-neutral-600'}`}>
                                                {cat}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Action Buttons */}
                            <View className="flex-row gap-4 mb-6">
                                <TouchableOpacity 
                                    onPress={onClose}
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