import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../AuthContext";
import EmailPasswordInput from "./EmailPasswordInput";

export default function SignUpForm() {
    const { signupWithEmail, error, clearError } = useAuth();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const signupClicked = async () => {
        clearError();
        await signupWithEmail(email, password, fullName);
    };

    return (
        <View>
            <View className="flex-row gap-3 mb-5">
                {/* First Name */}
                <View className="flex-1">
                    <Text className="text-neutral-600 text-sm font-medium mb-2 ml-1">
                        Full Name
                    </Text>
                    <TextInput
                        className="
                            bg-neutral-100
                            text-neutral-900
                            px-4
                            h-14
                            rounded-2xl
                            text-base
                            border
                            border-neutral-200
                            "
                        placeholder="Full Name"
                        placeholderTextColor="#9d9490"
                        value={fullName}
                        onChangeText={setFullName}
                        autoCorrect={false}
                    />
                </View>
            </View>

            <EmailPasswordInput
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                forgotPasswordClicked={() => {}}
                showForgotPassword={false}
            />

            {/* Error Message */}
            {error && (
                <View className="mb-5 mt-3 items-center text-center justify-center">
                    <Text className="text-red-500 text-base text-center">{error}</Text>
                </View>
            )}

            {/* Sign Up Button */}
            <TouchableOpacity
                className="bg-primary-500 py-4 rounded-2xl items-center"
                activeOpacity={0.8}
                onPress={signupClicked}
            >
                <Text className="text-white text-base font-semibold tracking-wide">
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>
    );
}
