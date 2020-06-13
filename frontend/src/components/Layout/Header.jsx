import React, { useState, useContext } from 'react';
import './Layout.scss';
import { Link } from 'react-router-dom';
import { TiUser } from "react-icons/ti";
import { TiFlashOutline } from "react-icons/ti";
import { UserContext } from '../../context/UserContext';

import Button from 'react-bulma-components/lib/components/button';
import Login from '../User/Login';

export default function Header() {

    const { userId } = useContext(UserContext);
    const [show, setShow] = useState(false);

    const LoginModal = ({ show, setShow }) => {
        const content = show && (
            <div className="overlay">
                <div className="dialog">
                    <div className="close-modal right" type="button" onClick={() => setShow(false)}>X</div>
                    <Login show={show} setShow={setShow} />
                </div>
            </div>
        )
        return content;
    }

    return (
            <div className="grid-container">
                <div className="logo">
                    <Link to='/'><p id="logo"><strong>JS</strong>wiki</p></Link>
                </div>
                <div className="main-menu">
                    <Link to='/wiki'><p className="nav-link">wiKi<TiFlashOutline className="nav-icon" /></p></Link>
                </div>
                <div className="login-button">
                    { userId != null ?
                    <Link to='/profile'><Button color='danger' outlined rounded className='right big-button'><TiUser className="button-icon" />mon compte</Button></Link>
                    :
                    <Button color='danger' rounded className='right big-button' onClick={() => setShow(true)}><TiUser className="button-icon" />se connecter</Button>
                    }
                </div>

            <LoginModal show={show} setShow={setShow} />

            </div>


    )
}
