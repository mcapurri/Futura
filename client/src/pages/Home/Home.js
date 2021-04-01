import React, { useState } from 'react';
import style from './Home.module.css';

import Login from '../../components/Auth/Login/Login';
import Signup from '../../components/Auth/Signup/Signup';
import ForgotPassword from '../../components/Auth/ForgotPassword/ForgotPassword';
import Profile from '../../components/Profile/Profile';

import { logout } from '../../utils/auth';
import { AiOutlineLogout as LogoutIcon } from 'react-icons/ai';

const Home = ({ user, setUser }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);

    const handleLogout = () =>
        logout()
            .then(() => {
                setUser(() => '');
            })
            .catch((err) => {
                console.log(err);
            });

    return (
        <div className={style.Home}>
            <header>
                {user && (
                    <>
                        <div className={style.Avatar}>
                            {user.avatar ? (
                                <img src={user.avatar} alt="user-avatar" />
                            ) : (
                                <h1
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '4rem',
                                    }}
                                >
                                    +
                                </h1>
                            )}
                        </div>
                        <LogoutIcon
                            style={{
                                fontSize: '2rem',
                                display: 'flex',
                                justifySelf: 'flex-start',
                                position: 'fixed',
                                right: '7%',
                                top: '3%',
                            }}
                            onClick={handleLogout}
                        />
                    </>
                )}
                <img src="assets/sea-img.png" alt="sea-img" />
            </header>
            {!user ? (
                isSignup ? (
                    <Signup setUser={setUser} setIsSignup={setIsSignup} />
                ) : forgotPassword ? (
                    <ForgotPassword />
                ) : (
                    <Login
                        setUser={setUser}
                        setIsSignup={setIsSignup}
                        setForgotPassword={setForgotPassword}
                    />
                )
            ) : (
                <Profile user={user} />
            )}
        </div>
    );
};

export default Home;
