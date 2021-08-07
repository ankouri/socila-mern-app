import { createContext, useReducer } from "react";
import PostReducer from "./PostReduce";

const POST_INITIAL_POST = {
    post:null,
    isFetching:false,
    error:false,
};

export const PostContext = createContext(POST_INITIAL_POST);

export const PostContextProvider = ( {children} ) => {
    const [state, dispatch ] = useReducer(PostReducer, POST_INITIAL_POST);
    return(
        <PostContext.Provider value={
            {
                post: state.post,
                isFetching:state.isFetching,
                error:state.error,
                dispatch,
            }
        }>
            { children }
        </PostContext.Provider>
    );
}