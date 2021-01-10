import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../Firebase'
import Upload from '../Upload/Upload'
import './Header.css'

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button } from '@material-ui/core'

const Header = ({user}) => {
    return (
        <div className="header">
            <div className="container menu">
                <div className="logo">
                       <Link to="/">
                        Shamajik
                       </Link>
                </div>
                <nav>
                    <ul>
                        {
                            user?
                            <li>
                                <Upload userName={user?.displayName} />
                            </li> : '' 
                        }      
                        { 
                        user ?
                        <li>
                            <Button
                            startIcon={<ExitToAppIcon />} onClick={() => auth.signOut()}>Logout</Button>
                        </li>
                        : ''
                        }
                    </ul> 
                </nav>
            </div>
        </div>
    )
}

export default Header
