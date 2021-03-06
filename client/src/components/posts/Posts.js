import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { getPosts } from "../../actions/post"
import Spinner from "../layouts/Spinner"
import PostItem from "./PostItem"
import PostForm from "./PostForm"

const Posts = ({ getPosts, post: { posts, loading } }) => {

    useEffect(() => {
        getPosts()
    }, [getPosts])

    return loading ? <Spinner /> : <>
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
            <i className="fa fa-user"></i>
            Welcome to the community
        </p>
        
        <PostForm />

        <div className="posts">
            {posts.map((post) => (
                <PostItem key={post._id} post={post} />
            ))}
        </div>
    </>
}

const mapStateToProps = (state) => ({
    post: state.post
})

const mapDispatchToProps = (dispatch) => ({
    getPosts: () => dispatch(getPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
