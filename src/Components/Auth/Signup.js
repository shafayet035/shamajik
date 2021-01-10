import React, { useState } from 'react'
import './Auth.css'
import { Button, TextField } from '@material-ui/core'
import { auth } from '../../Firebase'

const Auth = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signupHandler = (e) => {
        e.preventDefault()
        if(username !== '') {
            auth.createUserWithEmailAndPassword(email, password)
                .then((authUser) => {
                    return authUser.user.updateProfile({
                        displayName: username
                    })
                })
                .catch(err => alert(err.message))
        } else {
            alert('Please Enter a Username')
        }
    }

    return (
        <form onSubmit={signupHandler} className="signUp__form" noValidate autoComplete="off">
            <TextField className="text__input" onChange={(e) => setUsername(e.target.value)}  label="User Name" variant="outlined" />
            <TextField type="email" onChange={(e) => setEmail(e.target.value)} className="text__input"  label="Email" variant="outlined" />
            <TextField type="password" onChange={(e) => setPassword(e.target.value)} className="text__input"  label="Password" variant="outlined" />
            <Button type="submit" variant="contained" color="primary">Sign up</Button>
        </form>
    )
}

export default Auth
