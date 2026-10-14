import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref<boolean>(true);

    const applyTheme = async (dark: boolean) => {
        isDark.value = dark;
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            if (Capacitor.isNativePlatform()) {
                try {
                    await StatusBar.setBackgroundColor({ color: '#0f0f0f' });
                    await StatusBar.setStyle({ style: Style.Light });
                } catch (e) {}
            }
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            if (Capacitor.isNativePlatform()) {
                try {
                    await StatusBar.setBackgroundColor({ color: '#ffffff' });
                    await StatusBar.setStyle({ style: Style.Dark });
                } catch (e) {}
            }
        }
    };

    const toggleTheme = () => {
        applyTheme(!isDark.value);
    };

    const initTheme = () => {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') {
            applyTheme(false);
        } else {
            applyTheme(true);
        }
    };

    return {
        isDark,
        applyTheme,
        toggleTheme,
        initTheme,
    };
});
