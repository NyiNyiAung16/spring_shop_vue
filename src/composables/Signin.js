import { ref } from 'vue';
import {auth} from '../firebase/config.js'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const error = ref(null);
const registerUser = async (email,password,displayName,photoURL) => {
    try{
        let res = await createUserWithEmailAndPassword(auth,email,password);
        let user = res.user;
        await updateProfile(user,{displayName,photoURL});
        return res;
    }catch(err){
        error.value = err.message;
        if(err.message == 'Firebase: Error (auth/network-request-failed).'){
            error.value = "Please check your network and You can't request!"
        }
        if(err.message == 'Firebase: Error (auth/invalid-email).'){
            error.value = 'Email is invalid. You have to fill email!'
        }
        if(err.message == 'Firebase: Error (auth/invalid-login-credentials).'){
            error.value = 'Your Credentials is not record!'
        }
        if(err.message ==  'Firebase: Password should be at least 6 characters (auth/weak-password).'){
            error.value = 'Password should be at least 6 characters!'
        }
        setTimeout(()=>{
            error.value = ''
        },3000);
    }
};

const signIn = () => {
    return {error,registerUser};
}

export default signIn;