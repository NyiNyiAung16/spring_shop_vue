import { ref } from 'vue';
import {auth} from '../firebase/config.js'
import { signInWithEmailAndPassword } from 'firebase/auth'

const error = ref(null);
const loginUser =async (email,password) => {
    try{
        let res = await signInWithEmailAndPassword(auth,email,password);
        if(!res){
            throw new Error ("You can't login in!")
        }
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
        setTimeout(()=>{
            error.value = ''
        },3000);
    }
};

const Login = () => {
    return {error,loginUser};
}

export default Login;