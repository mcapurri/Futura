import React, { useState, useEffect } from 'react';
import style from './Home.module.css';
import { Route } from 'react-router-dom';
import Login from '../../components/Auth/Login/Login';
import Profile from '../../components/Profile/Profile';
import ProtectedRoute from '../../utils/ProtectedRoute';
import { TiThMenu as MenuIcon } from 'react-icons/ti';

const Home = ({ user, setUser, handleLogout, toggleDrawer, ...props }) => {
    // console.log('user', user);

    // Show text in the header if screen > 660px
    const [width, setWidth] = useState(window.innerWidth);
    // console.log('width', width);

    const handleResize = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={style.Home}>
            {user !== '' && (
                <header>
                    <MenuIcon
                        style={{
                            fontSize: '2rem',
                            display: 'flex',
                            justifySelf: 'flex-start',
                            alignSelf: 'flex-start',
                            position: 'fixed',
                            right: '7%',
                            top: '3%',
                            color: 'rgb(5, 58, 32)',
                        }}
                        onClick={toggleDrawer}
                    />
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <div className={style.Logo}>
                            <img
                                src="assets/africa-recycle-logo.png"
                                alt="recycle-logo"
                            />
                            <h1>!</h1>
                        </div>
                        {width > '660' && (
                            <p
                                style={{
                                    marginRight: '15%',
                                }}
                            >
                                It's all about what you do for our future...{' '}
                            </p>
                        )}
                    </div>
                </header>
            )}

            {!user ? (
                <Route
                    exact
                    path="/"
                    render={(props) => <Login {...props} setUser={setUser} />}
                />
            ) : (
                <ProtectedRoute
                    exact
                    path="/"
                    component={Profile}
                    user={user}
                    setUser={setUser}
                />
            )}
        </div>
    );
};

export default Home;
