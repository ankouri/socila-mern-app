const PostReducer = (state, action) => {
  switch (action.type) {
    case "POST_START":
      return {
        post: null,
        isFetching: true,
        error: false,
      };
    case "POST_SUCCESS":
      return {
        post: action.payload,
        isFetching: false,
        error: false,
      };
    case "POST_FAILED":
      return {
        post: null,
        isFetching: false,
        error: true,
      };

    default:
      return state;
  }
};

export default PostReducer;
