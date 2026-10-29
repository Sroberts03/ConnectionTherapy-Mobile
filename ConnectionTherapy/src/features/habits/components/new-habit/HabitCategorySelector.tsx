import { TouchableOpacity, Text, View } from "react-native"
import { HabitCategory } from "../../habits.types"

interface HabitCategorySelectorProps {
    currentCategory: HabitCategory
    setCurrentCategory: (category: HabitCategory) => void
}

export default function HabitCategorySelector({ currentCategory, setCurrentCategory }: HabitCategorySelectorProps) {
    const categories = Object.values(HabitCategory)

    return (
        <View className="mb-8">
            <Text className="text-sm font-semibold text-neutral-600 mb-3 ml-1">Category</Text>
            {/* Wraps instead of scrolling so every option is visible */}
            <View className="flex-row flex-wrap gap-2">
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        onPress={() => setCurrentCategory(cat)}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: currentCategory === cat }}
                        className={`px-4 py-2.5 rounded-full border ${currentCategory === cat ? 'bg-primary-600 border-primary-600' : 'bg-neutral-50 border-neutral-200'}`}
                    >
                        <Text className={`capitalize font-semibold ${currentCategory === cat ? 'text-white' : 'text-neutral-600'}`}>
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

    )
}