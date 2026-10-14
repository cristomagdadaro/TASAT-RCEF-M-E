import '../css/app.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './presentation/App.vue';
import router from './presentation/router';
import { SQLiteStorageService } from './infrastructure/storage/SQLiteStorageService';

async function bootstrap() {
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
