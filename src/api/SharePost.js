import axios from 'axios';

export const sharePost = async(post, dispatch) =>{
    dispatch({type:"POST_START"});
    try{
        
        const res = await axios.post('/api/posts', post);
        dispatch({type:"POST_SUCCESS", payload: res.data });
    
    }catch(err){

        dispatch({type:"POST_FAILED", payload:err});
    }
}