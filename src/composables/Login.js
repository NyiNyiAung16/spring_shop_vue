import { ref } from 'vue';
import {auth} from '../firebase/config.js'
import { signInWithEmailAndPassword } from 'firebase/auth'

const error = ref(null);
const loginUser =async (email,password) => {
    try{
        let res = await signInWithEmailAndPassword(auth,email,password);
        return res;
    }catch(err){
        error.value = err.message;
        setTimeout(()=>{
            error.value = ''
        },3000);
    }
};

const Login = () => {
    return {error,loginUser};
}

export default Login;