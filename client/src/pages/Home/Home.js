import React, { useState } from 'react';
import style from './Home.module.css';

import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup';
import Profile from '../../components/Profile/Profile';
const Home = ({ user, setUser }) => {
    console.log('user', user);
    const [isSignup, setIsSignup] = useState(false);

    return (
        <div className={style.Home}>
            <header>
                {user && (
                    <div
                        style={{
                            width: '10rem',
                            height: '10rem',
                            border: '10px solid #fff',
                            backgroundColor: 'transparent',
                            position: 'fixed',
                            top: '5%',
                            borderRadius: '80px',
                        }}
                    >
                        <img src={user.avatar} alt="user-avatar" />
                    </div>
                )}
                <img src="assets/sea-img.png" alt="sea-img" />
            </header>
            {!user ? (
                isSignup ? (
                    <Signup setUser={setUser} setIsSignup={setIsSignup} />
                ) : (
                    <Login setUser={setUser} setIsSignup={setIsSignup} />
                )
            ) : (
                <Profile user={user} />
            )}
        </div>
    );
};

export default Home;
