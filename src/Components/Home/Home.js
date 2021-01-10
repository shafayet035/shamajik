import React, { useEffect, useState } from 'react'
import './Home.css';
import { db } from '../../Firebase'
import Post from '.././Post/Post'

function Home({user}) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post:doc.data()
      })))
    })
  },[])

  return (
    <div className="App">
        {
          posts.map(pst => <Post user={user} postId={pst.id} key={pst.id} username={pst.post.username} caption={pst.post.caption} imageUrl={pst.post.imageUrl} />
          )
        }
    </div>
  );
}

export default Home;
