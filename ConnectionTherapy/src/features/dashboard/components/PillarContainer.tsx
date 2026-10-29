import { ConnectionPillar } from "../dashboard.types";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from 'react-native-svg';
import PillarAlert from "./PillarAlert";
import { usePillarDisplay } from "../utils/usePillarDisplay";

interface PillarContainerProps {
    pillar: ConnectionPillar
}

export default function PillarContainer({ pillar }: PillarContainerProps) {
    const size = 60;
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = pillar.percentage;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    const cx = size / 2;
    const cy = size / 2;
    const { IconComponent, name, hasScore, label, detail, openHabits } = usePillarDisplay(pillar);

    return (
        <TouchableOpacity 
            activeOpacity={0.7}
            onPress={openHabits}
            accessibilityRole="button"
            accessibilityLabel={`${name} pillar this week. ${detail}. View habits`}
            className="bg-white rounded-xl border border-neutral-200 items-center justify-center w-[48%] h-[150px]"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2
            }}
        >
            <PillarAlert
                pillar={pillar}
            />
            <View className="items-center justify-center relative mt-2" style={{ width: size, height: size }}>
                <Svg width={size} height={size} className="absolute">
                    <Circle
                        cx={cx}
                        cy={cy}
                        r={radius}
                        stroke="#e5e2dc"
                        strokeWidth={strokeWidth}
                        strokeDasharray={hasScore ? "1 0" : "3 6"}
                        fill="none"
                    />
                    {hasScore && <Circle
                        cx={cx}
                        cy={cy}
                        r={radius}
                        stroke={pillar.lightColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="none"
                        transform={`rotate(-90 ${cx} ${cy})`}
                    />}
                </Svg>
                <View className="absolute inset-0 items-center justify-center">
                    <IconComponent size={28} color="#B0A69D" />
                </View>
            </View>

            <Text className="text-neutral-700 font-semibold mt-4 text-[13px]">
                {name}
            </Text>
            {/* Colour lives in the ring; the number stays calm. No number until there's a day to count */}
            <Text className={hasScore ? "text-xl font-bold mt-1 text-neutral-900" : "text-sm font-medium mt-2 text-neutral-500"}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}