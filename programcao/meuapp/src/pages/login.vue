<!-- eslint-disable -->
<template>
    <v-container>
        <h1>Login com Google</h1>
        <v-btn color="primary" @click="authStore.login()">Login</v-btn>
    </v-container>
    <v-card v-if="authStore.isAuthenticated" class="mx-auto" max-width="400">
        <v-card-title>{{  authStore.user.displayName }}</v-card-title>
        <v-card-text>
            <v-img :src="authStore.user.photoURL" width="100" height="100"></v-img>
            <p>{{ authStore.user.email }}</p>
            <p>{{ authStore.user.uid }}</p>
        </v-card-text>
        <v-card-action>
            <v-btn color="red" prepend-icon="mdi-logout"
                @click="authStore.logout">Sair</v-btn>
        </v-card-action>
    </v-card>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>