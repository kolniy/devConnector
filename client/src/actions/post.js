import axios from "axios"
import { setAlert } from "./alert"
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from "../actions/types"

// GET POSTS
export const getPosts = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/post')

            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

// ADD LIKE
export const addLike = (postId) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`/api/post/like/${postId}`)

            dispatch({
                type: UPDATE_LIKES,
                payload: {
                    id: postId,
                    likes: res.data
                }
            })
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

// REMOVE LIKE
export const removeLike = (postId) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`/api/post/unlike/${postId}`)

            dispatch({
                type: UPDATE_LIKES,
                payload: {
                    id: postId,
                    likes: res.data
                }
            })
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

// DELETE POST
export const deletePost = (postId) => {
    return async (dispatch) => {
        try {

           await axios.delete(`/api/post/${postId}`)
     
            dispatch({
                type: DELETE_POST,
                payload: postId
            })
            
            dispatch(setAlert('Post Removed', 'success'))
            
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}


// ADD POST
export const addPost = (formData) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/post/', formData, config)

            dispatch({
                type: ADD_POST,
                payload: res.data
            })
            
            dispatch(setAlert('Post Created', 'success'))
            
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

// GET POST
export const getPost = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/post/${id}`)

            dispatch({
                type: GET_POST,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

// ADD COMMENT
export const addComment = (postId, formData) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(`/api/post/comment/${postId}`, formData, config)

            dispatch({
                type: ADD_COMMENT,
                payload: res.data
            })
            
            dispatch(setAlert('Comment Added', 'success'))
            
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}


// DELETE COMMENT
export const deleteComment = (postId, commentId) => {
    return async (dispatch) => {
        try {
        
            await axios.delete(`/api/post/comment/${postId}/${commentId}`)

            dispatch({
                type: REMOVE_COMMENT,
                payload: commentId
            })
            
            dispatch(setAlert('Comment Removed', 'success'))
            
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}