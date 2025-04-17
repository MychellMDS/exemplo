<!-- eslint-disable -->
<template>
    <v-container>
        <v-card v-if="authStore.isAuthenticated" class="mx-auto" max-width="400">
            <v-card-title>{{ authStore.user.displayName }}</v-card-title>
            <v-card-text>
                <v-img :src="authStore.user.photoURL" width="100" height="100"></v-img>
                <p>{{ authStore.user.email }}</p>
                <p>{{ authStore.user.uid }}</p>
                <p>Role: {{ authStore.user.role }}</p>
            </v-card-text>
            <v-card-actions>
                <v-btn color="red" prepend-icon="mdi-logout" @click="authStore.logout">Sair</v-btn>
            </v-card-actions>
        </v-card>

        <v-card v-else class="mx-auto" max-width="400">
            <v-card-title>Login</v-card-title>
            <v-card-text>
                <v-btn color="blue" @click="loginAsAdmin">Login como Admin</v-btn>
                <v-btn color="green" @click="loginAsUser">Login como Usuário</v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

function loginAsAdmin() {
    authStore.login({
        displayName: 'Admin User',
        email: 'admin@example.com',
        uid: 'admin123',
        photoURL: 'https://via.placeholder.com/100',
        role: 'admin'
    })
}

function loginAsUser() {
    authStore.login({
        displayName: 'Regular User',
        email: 'user@example.com',
        uid: 'user123',
        photoURL: 'https://via.placeholder.com/100',
        role: 'user'
    })
}
</script>