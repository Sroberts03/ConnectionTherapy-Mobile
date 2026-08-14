import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "../../features/auth/AuthContext";

export default function TabLayout() {
    const { user } = useAuth();
    if (user == null) {
        return null;
    }
    
    return (
        <Tabs screenOptions= {{ 
            tabBarStyle: {
                width: '90%',
                height: 60,
                borderRadius: 30,
                bottom: 30,
                position: 'absolute',
                left: '50%',
                marginLeft: '5%',
                shadowColor: '#000000aa',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
            tabBarActiveTintColor: '#6366f1',
            tabBarInactiveTintColor: '#94a3b8',
            headerShown: false 
        }}>
            <Tabs.Screen 
                name="Dashboard"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
                }}
             />
             <Tabs.Screen 
                name="Habits"
                options={{
                    title: "Habits",
                    tabBarIcon: ({ color }) => <Ionicons name="checkbox" size={28} color={color} />,
                }}
             />
             <Tabs.Screen 
                name="Profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />,
                }}
             />
         </Tabs>
     )
 }