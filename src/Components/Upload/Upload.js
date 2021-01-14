import React, { useState } from 'react'
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { TextField, Input, LinearProgress } from '@material-ui/core';
import firebase from 'firebase'

import './Upload.css'
import { db, storage } from '../../Firebase';

import { connect } from 'react-redux'


const Upload = (props) => {

    const [state, setState] = useState({
      bottom: false,
    });
    const [caption, setCaption] = useState('')
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(0);
  

    const toggleDrawer = (anchor, open) => (event) => {
      setState({ ...state, [anchor]: open });
    };

    const fileHandle = (e) => {
        if(e.target.files[0]){
            setFile(e.target.files[0])
        }
    }

    const uploadHandle = (e) => {
        const random = Math.floor(Math.random() * 10054000 + 1)

        e.preventDefault()
        const uploadFunc = storage.ref(`files/${file.name}${random}`).put(file)

        uploadFunc.on(
            "state_changed",
            (snapshot) => {
                const progressbar = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progressbar);
            },
            (error) => {
                console.log(error.message);
            },
            () => {
                storage
                    .ref("files")
                    .child(`${file.name}${random}`)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                           caption: caption,
                           imageUrl: url,
                           username: props.userName,
                           photoURL: props.photoURL
                        })
                        db.collection('users').doc(props.user?.uid).collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: props.userName,
                            photoURL: props.photoURL
                        })
                    });
                    setCaption('')
                    setFile(null)
                    setProgress(0)
                    setState({ ...state, [anchor]: false });
                    console.log(file)
            }
        )
    }
  
    const list = (anchor) => (
      <div className="upload_form"
        role="presentation"
      > 
        <form noValidate autoComplete="off">
            <LinearProgress className="upload_form_field" variant="determinate" value={progress} />
            <TextField className="upload_form_field" onChange={(e) => setCaption(e.target.value)} id="outlined-basic" label="Write Something...." variant="outlined" />
            <Input className="upload_form_field" onChange={fileHandle} type="file" />
            <Button type="submit" onClick={uploadHandle} className="upload_form_field" variant="contained" color="primary">Upload</Button>
        </form>
      </div>
    );

    const anchor = 'bottom'

    return (
        <div className="upload">
            <Button variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />} onClick={toggleDrawer(anchor, true)}>Upload</Button>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
            </Drawer>
        </div>
    )
}

const mapState = state => {
    return {
        user: state.user,
        userName: state.user.displayName,
        photoURL: state.user.photoURL
    }
}

export default connect(mapState) (Upload)
