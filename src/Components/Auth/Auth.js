import React, { useState } from 'react'
import './Auth.css'
import { Button, TextField, Typography } from '@material-ui/core'
import Signup from './Signup'
import { auth } from '../../Firebase'

const Auth = () => {
    const [is, setIs] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
            .catch(err => alert(err.message))
    }

    const form = (
        <form onSubmit={loginHandler} className="signin__form" noValidate autoComplete="off">
            <TextField type="email" onChange={(e) => setEmail(e.target.value)} className="text__input"  label="Email" variant="outlined" />
            <TextField type="password" onChange={(e) => setPassword(e.target.value)} className="text__input"  label="Password" variant="outlined" />
            <Button type="submit" variant="contained" color="primary">Sign in</Button>
        </form>
    )

    return (
        <div className="auth">
            {
                is ? form : <Signup /> 
            }
            <Typography variant="body1" color="textSecondary" component="p">
               { !is ? " Already a Registered Member?" : "Reigster New Account" } <span className="span" onClick={() => setIs(!is)}>{!is ?"Login": "Signup"}</span>
            </Typography>
        </div>
    )
}

export default Auth
