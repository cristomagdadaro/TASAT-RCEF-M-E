import '../css/app.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import App from './presentation/App.vue';
import router from './presentation/router';
import { SQLiteStorageService } from './infrastructure/storage/SQLiteStorageService';

async function setupStatusBar() {
    if (Capacitor.isNativePlatform()) {
        try {
            await StatusBar.setOverlaysWebView({ overlay: false });
            await StatusBar.setBackgroundColor({ color: '#ffffff' });
            await StatusBar.setStyle({ style: Style.Dark });
        } catch (e) {
            console.warn('Native status bar configuration skipped:', e);
        }
    }
}

async function bootstrap() {
    await setupStatusBar();

    // Initialize SQLite persistence before UI mounting
    try {
        await SQLiteStorageService.getInstance().initialize();
    } catch (e) {
        console.error('SQLite initialization warning:', e);
    }

    const app = createApp(App);
    const pinia = createPinia();

    app.use(pinia);
    app.use(router);

    app.mount('#app');
}

bootstrap();
