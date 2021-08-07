export const PostStart = (post) =>({
    type:"POST_START",
});

export const PostSuccess = (post) =>({
    type:"POST_SUCCESS",
    payload:post,
});

export const PostFailed = () => ({
   type:"POST_FAILED",
});

