import React, { useEffect } from 'react'
import { Avatar, Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { db } from '../../Firebase';
import Post from '../Post/Post';


const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(13),
        height: theme.spacing(13),
        marginTop: '-50px',
        border: '3px solid #f4f4f4'
      },
    media: {
      height: 240,
    },
    cardContent:{
        display: 'flex'
    },
    name: {
        marginLeft: '5px'
    }
  }));

const Profile = (props) => {
    const classes = useStyles();

    useEffect(() => {
        if(props.user) {
            db.collection('users').doc(props.user?.uid).collection('posts').orderBy('timestamp', 'desc')
            .onSnapshot( snapshot => {
                props.setMyPost(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        }
    }, [props.user])

    return (
        <div className="profile">
            <div className="container">
                <div className="profile__header">
                    <Card>
                        <CardMedia className={classes.media}
                            image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
                            title="Contemplative Reptile"
                            />
                        <CardContent className={classes.cardContent}>
                            <Avatar src="https://i.pinimg.com/originals/bf/82/f6/bf82f6956a32819af48c2572243e8286.jpg" className={classes.large} />
                            <Typography variant="h5" className={classes.name} gutterBottom>
                                Shafayet Hossain
                            </Typography>
                        </CardContent>
                    </Card>
                </div>

                <div className="profile__body">
                {  props.myPosts &&
                    props.myPosts.map(pst => (<Post postId={pst.id} key={pst.id} username={pst.data.username} avatar={pst.data.photoURL} caption={pst.data.caption} imageUrl={pst.data.imageUrl} />)
                    )
                }
                </div>
            </div>
        </div>
    )
}

const mapState = state => {
    return {
        user: state.user,
        myPosts: state.myPosts
    }
}

const mapDispatch = dispatch => {
    return {
        setMyPost: (posts) => dispatch({type: 'SET_MY_POST', myPosts: posts})
    }
}

export default connect(mapState, mapDispatch) (Profile)
