import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../AuthContext";
import GlobalErrorDisplay from "../../../globalComponents/GlobalErrorDisplay";
import EmailPasswordInput from "./EmailPasswordInput";
import { forgotPassword } from "../services/auth.service";

export default function LoginForm() {
    const { loginWithEmail, error, clearError } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const loginClicked = async () => {
        clearError();
        await loginWithEmail(email, password);
    };

    const forgotPasswordClicked = async () => {
        await forgotPassword(email);
        alert("forgot password clicked not yet implemented");
    };

    return (
        <View>
            <EmailPasswordInput
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                forgotPasswordClicked={forgotPasswordClicked}
            />

            {/* Error Message */}
            {error && <GlobalErrorDisplay error={error} />}

            {/* Sign In Button */}
            <TouchableOpacity
                className="bg-primary-500 py-4 rounded-2xl items-center"
                activeOpacity={0.8}
                onPress={loginClicked}
            >
                <Text className="text-white text-base font-semibold tracking-wide">
                    Sign In
                </Text>
            </TouchableOpacity>
        </View>
    );
}
