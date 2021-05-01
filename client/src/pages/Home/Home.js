import React from 'react';
import style from './Home.module.css';
import { Route } from 'react-router-dom';
import Login from '../../components/Auth/Login/Login';
import Profile from '../../components/Profile/Profile';
import ProtectedRoute from '../../utils/ProtectedRoute';
import { TiThMenu as MenuIcon } from 'react-icons/ti';

const Home = ({ user, setUser, handleLogout, toggleDrawer, ...props }) => {
    // console.log('user', user);

    return (
        <div className={style.Home}>
            {user !== '' && (
                <header>
                    {/* <div className={style.Avatar}>
                        {user?.avatar ? (
                            <div>
                                <label htmlFor={style.FileLoader}>
                                    <img src={user.avatar} alt="user-avatar" />
                                </label>
                                <input
                                    id={style.FileLoader}
                                    type="file"
                                    name="avatar"
                                    onChange={(e) => handleFileUpload(e)}
                                />
                            </div>
                        ) : (
                            <h1
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '2.5rem',
                                }}
                            >
                                <label htmlFor={style.FileLoader}>
                                    <ImUserPlus />
                                </label>
                                <input
                                    id={style.FileLoader}
                                    type="file"
                                    name="avatar"
                                    value={user.avatar}
                                    onChange={(e) => handleFileUpload(e)}
                                />
                            </h1>
                        )}
                    </div> */}
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
                    <div className={style.Logo}>
                        <img
                            src="assets/africa-recycle-logo.png"
                            alt="recycle-logo"
                        />
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
