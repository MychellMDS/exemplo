// Utilities
import { defineStore } from 'pinia'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
    }),
    actions: {
        async login () {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            try {
                const result = await signInWithPopup(auth, provider);
                this.user = result.user;
                this.isAuthenticated = true;
            } catch (error) {
                console.error("Erro ao fazer login:", error);
            }
        },
        logout() {
            this.user = null
            this.isAuthenticated = false
            const auth = getAuth();
            signOut(auth).catch(error => {
                console.error("Erro ao fazer logout:", error);
            });
        },
    },


})
