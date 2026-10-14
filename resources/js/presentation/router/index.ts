import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import LoginView from '../views/LoginView.vue';
import InterviewListView from '../views/InterviewListView.vue';
import InterviewFormView from '../views/InterviewFormView.vue';
import InterviewDetailView from '../views/InterviewDetailView.vue';

// Use Hash history for Capacitor mobile offline WebView compatibility
const isCapacitor = typeof (window as any).Capacitor !== 'undefined';
const history = isCapacitor ? createWebHashHistory() : createWebHistory();

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { guestOnly: true },
    },
    {
        path: '/',
        redirect: '/interviews',
    },
    {
        path: '/interviews',
        name: 'interviews',
        component: InterviewListView,
        meta: { requiresAuth: true },
    },
    {
        path: '/interviews/new',
        name: 'new-interview',
        component: InterviewFormView,
        meta: { requiresAuth: true },
    },
    {
        path: '/interviews/:id',
        name: 'interview-detail',
        component: InterviewDetailView,
        meta: { requiresAuth: true },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/interviews',
    },
];

const router = createRouter({
    history,
    routes,
});

router.beforeEach(async (to) => {
    const authStore = useAuthStore();

    if (!authStore.isInitialized) {
        await authStore.checkAuth();
    }

    if (to.meta.requiresAuth && !authStore.user) {
        return { name: 'login' };
    }

    if (to.meta.guestOnly && authStore.user) {
        return { name: 'interviews' };
    }

    return true;
});

export default router;
