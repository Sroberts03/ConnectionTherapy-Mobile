import Feather from "@expo/vector-icons/build/Feather";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

interface EmailPasswordInputProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    forgotPasswordClicked: () => void;
    showForgotPassword?: boolean;
}

export default function EmailPasswordInput({ 
    email, 
    setEmail, 
    password, 
    setPassword,
    showPassword, 
    setShowPassword,
    forgotPasswordClicked,
    showForgotPassword = true
}: EmailPasswordInputProps) {
    return (
        <View>
            <View className="mb-5">
                <Text className="text-neutral-600 text-sm font-medium mb-2 ml-1">
                    Email
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
                    placeholder="Email"
                    placeholderTextColor="#9d9490"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>

            <View className="mb-7">
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-neutral-600 text-sm font-medium ml-1">
                        Password
                    </Text>
                    {showForgotPassword && (
                        <TouchableOpacity onPress={forgotPasswordClicked} activeOpacity={0.7}>
                            <Text className="text-primary-500 text-sm font-medium">
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View className="relative">
                    <TextInput
                        className="
                        bg-neutral-100
                        text-neutral-900
                        px-4
                        h-14
                        pr-12
                        rounded-2xl
                        text-base
                        border
                        border-neutral-200
                        "
                        placeholder="Password"
                        placeholderTextColor="#9d9490"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        className="absolute right-4 top-0 bottom-0 justify-center"
                        onPress={() => setShowPassword(!showPassword)}
                        activeOpacity={0.7}
                    >
                        <Feather
                            name={showPassword ? "eye" : "eye-off"}
                            size={20}
                            color="#9d9490"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}