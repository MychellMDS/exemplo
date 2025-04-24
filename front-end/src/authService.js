import { auth, googleProvider, signInWithPopup } from './firebase';
import { FacebookAuthProvider } from 'firebase/auth';

// Configurando o provedor do Facebook
const facebookProvider = new FacebookAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Erro no login com Google:', error);
  }
};

export const loginWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return result.user;
  } catch (error) {
    console.error('Erro no login com Facebook:', error);
  }
};
