import React , { useEffect } from 'react'
import { connect } from "react-redux"
import Spinner from "../layouts/Spinner"
import { Link } from "react-router-dom"
import PostItem from "../../components/posts/PostItem"
import { getPost } from "../../actions/post"
import CommentForm from './CommentForm'
import CommentItem from "./CommentItem"

const Post = ({ getPost, post: { post, loading }, match }) => {

    useEffect(() => {
        getPost(match.params.id)
    }, [getPost])

    return loading || post === null ? <Spinner /> : <>
        <Link to="/posts" className="btn">Back To Posts</Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        {
            post.comments.map((comment) => {
                return <CommentItem key={comment._id} comment={comment} postId={post._id} />
            })
        }
    </>
}

const mapStateToProps = (state) => ({
    post: state.post
})

const mapDispatchToProps = (dispatch) => ({
    getPost : (id) => dispatch(getPost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
