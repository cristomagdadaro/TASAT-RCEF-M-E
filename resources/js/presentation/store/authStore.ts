import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User } from '../../domain/entities/User';
import { LocalSQLiteAuthRepository } from '../../infrastructure/repositories/LocalSQLiteAuthRepository';
import { LoginUseCase } from '../../application/use-cases/LoginUseCase';
import { LogoutUseCase } from '../../application/use-cases/LogoutUseCase';
import { GetCurrentUserUseCase } from '../../application/use-cases/GetCurrentUserUseCase';

const authRepo = new LocalSQLiteAuthRepository();
const loginUseCase = new LoginUseCase(authRepo);
const logoutUseCase = new LogoutUseCase(authRepo);
const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepo);

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const isLoading = ref<boolean>(false);
    const isInitialized = ref<boolean>(false);
    const errorMessage = ref<string | null>(null);

    const checkAuth = async () => {
        isLoading.value = true;
        try {
            user.value = await getCurrentUserUseCase.execute();
        } catch (error) {
            console.error('Failed to restore session:', error);
            user.value = null;
        } finally {
            isLoading.value = false;
            isInitialized.value = true;
        }
    };

    const login = async (identifier: string, pass: string) => {
        isLoading.value = true;
        errorMessage.value = null;
        try {
            user.value = await loginUseCase.execute(identifier, pass);
            return user.value;
        } catch (error: any) {
            errorMessage.value = error.message || 'Login failed.';
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    const logout = async () => {
        isLoading.value = true;
        try {
            await logoutUseCase.execute();
            user.value = null;
        } finally {
            isLoading.value = false;
        }
    };

    return {
        user,
        isLoading,
        isInitialized,
        errorMessage,
        checkAuth,
        login,
        logout,
    };
});
