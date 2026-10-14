import '../css/app.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import App from './presentation/App.vue';
import router from './presentation/router';
import { SQLiteStorageService } from './infrastructure/storage/SQLiteStorageService';
import { useThemeStore } from './presentation/store/themeStore';

async function setupStatusBar() {
    if (Capacitor.isNativePlatform()) {
        try {
            const isLight = localStorage.getItem('theme') === 'light';
            await StatusBar.setOverlaysWebView({ overlay: false });
            await StatusBar.setBackgroundColor({ color: isLight ? '#ffffff' : '#0f0f0f' });
            await StatusBar.setStyle({ style: isLight ? Style.Dark : Style.Light });
        } catch (e) {
            console.warn('Native status bar configuration skipped:', e);
        }
    }
}

async function bootstrap() {
    await setupStatusBar();

    try {
        await SQLiteStorageService.getInstance().initialize();
    } catch (e) {
        console.error('SQLite initialization warning:', e);
    }

    const app = createApp(App);
    const pinia = createPinia();

    app.use(pinia);
    app.use(router);

    const themeStore = useThemeStore();
    themeStore.initTheme();

    app.mount('#app');
}

bootstrap();
