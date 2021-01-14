import React, { useEffect } from 'react'
import './Home.css';
import { db } from '../../Firebase'
import Post from '.././Post/Post'
import { connect } from 'react-redux'

function Home(props) {
  useEffect(() => {
    const unsubscribe = db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      props.getPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post:doc.data()
      })))
    })
    return () => {
      unsubscribe()
    }
  },[])



  return (
    <div className="home container">
        {  props.posts &&
         props.posts.map(pst => (<Post postId={pst.id} key={pst.id} username={pst.post.username} caption={pst.post.caption} avatar={pst.post.photoURL} imageUrl={pst.post.imageUrl} />)
         )
        }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    posts: state.posts,
  }
}

const mapDispatchToState = dispatch => {
  return {
    getPosts: (posts) => dispatch({type: 'GET_POSTS', posts: posts})
  }
}

export default connect(mapStateToProps, mapDispatchToState) (Home);
