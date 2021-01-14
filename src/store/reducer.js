const initialState = {
    user: null,
    posts: [],
    myPosts: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ('ADD_USER') :
             return {
                 ...state,
                 user: action.user
             }
             
        case('GET_POSTS') :
             return {
                 ...state,
                 posts: action.posts
             }
             
        case('SET_MY_POST'): 
             return {
                 ...state,
                 myPosts: action.myPosts
             }
             
        default : 
            return state

    }
}

export default reducer