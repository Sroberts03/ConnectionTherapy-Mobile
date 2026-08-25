import { ConnectionPillar } from "../dashboard.types";
import { Text, View } from "react-native";
import Svg, { Circle } from 'react-native-svg';
import * as LucideIcons from 'lucide-react-native';
import PillarAlert from "./PillarAlert";

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
    const iconName = pillar.icon.charAt(0).toUpperCase() + pillar.icon.slice(1);
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Circle;

    return (
        <View 
            className="bg-white rounded-xl border border-gray-100 items-center justify-center w-[140px] h-[150px]"
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
                        stroke="#e5e7eb"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    <Circle
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
                    />
                </Svg>
                <View className="absolute inset-0 items-center justify-center">
                    <IconComponent size={28} color="#B0A69D" />
                </View>
            </View>

            <Text className="text-[#5c5652] font-semibold mt-4 text-[13px]">
                {pillar.name.charAt(0).toUpperCase() + pillar.name.slice(1)}
            </Text>
            <Text 
                className="text-xl font-bold mt-1" 
                style={{ color: pillar.lightColor }}
            >
                {percentage}%
            </Text>
        </View>
    )
}