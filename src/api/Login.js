import axios from 'axios';

export const loginRequest = async(userCredentials, dispatch)=>{
    dispatch({ type:"LOGIN_START" });
    try{
        const res = await axios.post("/api/auth/login", userCredentials);
        dispatch( { type:"LOGIN_SUCCESS", payload: res.data });

    }catch(err){
        console.log(err);
        dispatch({type:"LOGIN_FAILED", payload: err});
    }
}