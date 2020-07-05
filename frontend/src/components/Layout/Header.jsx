import React, { useState, useContext } from 'react';
import './Layout.scss';
import { Link } from 'react-router-dom';
import { TiUser } from "react-icons/ti";
import { TiFlashOutline, TiThMenu } from "react-icons/ti";
import { UserContext } from '../../context/UserContext';

import Button from 'react-bulma-components/lib/components/button';
import Login from '../User/Login';

export default function Header() {

    const { userId } = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [ navOpen, setNavOpen ] = useState(0);

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

    const handleLogin = () => {
        setNavOpen(0);
        setShow(true);
    }

    return (
            <div className="grid-container">
                <div className="logo">
                    <Link to='/'><p id="logo"><strong>JS</strong>wiki</p></Link>
                </div>
                <nav className="responsive-toolbar">

                    <ul className={ navOpen ? 'active' : '' }>
                        <Link to='/wiki'><p>wiKi<TiFlashOutline className="nav-icon" /></p></Link>

                        { navOpen ?
                        
                            userId !== null ?
                                <Link to='/profile' onClick={() => setNavOpen(0)} ><TiUser className="button-icon" />mon compte</Link>
                            :
                                <>
                                <Link to='/createaccount' onClick={() => setNavOpen(0)} ><p>créer un compte</p></Link>
                                <Button color='primary' rounded className='big-button' onClick={handleLogin}><TiUser className="button-icon" />se connecter</Button>
                                </>
                            
                        : 

                            <>

                            { userId !== null ?
                                <Link to='/profile'><Button color='primary' outlined rounded className='big-button is-small'><TiUser className="button-icon" />mon compte</Button></Link>
                            :
                                <Button color='danger' outlined rounded className='big-button is-small' onClick={() => setShow(true)}><TiUser className="button-icon" />se connecter</Button>
                            }
                            </>
                        }

                        <figure onClick={ () => { setNavOpen(!navOpen) } }>
                            <TiThMenu className="image-menu" />
                        </figure>
                    </ul>
                </nav>

            <LoginModal show={show} setShow={setShow} />

            </div>


    )
}
