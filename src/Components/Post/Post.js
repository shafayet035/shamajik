import React, { useEffect, useState } from 'react'
import './Post.css'
import { Avatar, Button, Card, CardContent, CardHeader, Input, makeStyles, Typography } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import { db } from '../../Firebase';
import firebase from 'firebase'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        margin: '5px'
      },
  }));

const Post = (props) => {
    const classes = useStyles();
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        let unsubscribe;
        if(props.postId) {
          unsubscribe =  db.collection('posts').doc(props.postId).collection('comments').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                setComments(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        }
        return () => {
            unsubscribe()
        }
    }, [props.postId])

    const addcommentHandler = (e) => {
        e.preventDefault()
        if(comment !== '') {
            db.collection('posts').doc(props.postId).collection('comments').add({
                text: comment,
                user: props.user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setComment('')
        } else {
            alert('You Need to Add a Comment')
        }
    }

    return (
        <div className="post_parent">
            <div>
                <div className="post">
                    <Card>
                        <CardHeader
                            className="post__header"
                            avatar={
                            <Avatar src={props.avatar} />
                            }
                            title={props.username}
                            subheader=""
                        /> 
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.caption}
                            </Typography>
                        </CardContent>
                        <img className="post-image"
                           alt='' src={props.imageUrl}
                        />
                        <div>
                            <form onSubmit={addcommentHandler} className="comment_form" noValidate autoComplete="off">
                                <Avatar src={props.user.photoURL} alt={props.username} className={classes.small} />
                                <Input onChange={(e) => setComment(e.target.value)} placeholder="Add a Comment" 
                                className="comment__input" value={comment} />
                                <Button type="submit" >
                                    <SendIcon 
                                    className="comment__send" />
                                </Button>
                            </form>
                        </div>
                        <CardContent className="comments">
                            <div>
                             {
                                comments.map(comment => (
                                   <div className="comment__ind" key={comment.id}>
                                        <strong>{comment.data.user}</strong>
                                        <span className="span">{comment.data.text}</span>
                                   </div>
                                ))
                             }
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

const mapState = state => {
    return {
        user: state.user
    }
}


export default connect(mapState) (Post)
