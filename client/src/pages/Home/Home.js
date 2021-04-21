import React from 'react';
import style from './Home.module.css';
import { Route } from 'react-router-dom';
import service from '../../utils/service';
import Login from '../../components/Auth/Login/Login';
import Profile from '../../components/Profile/Profile';

import { TiThMenu as MenuIcon } from 'react-icons/ti';
import { ImUserPlus } from 'react-icons/im';

const Home = ({ user, setUser, handleLogout, toggleDrawer, ...props }) => {
    console.log('user', user);

    const handleFileUpload = async (e) => {
        console.log('The file to be uploaded is: ', e.target.files[0]);

        const uploadData = new FormData();
        // avatar => this name has to be the same as in the model since I pass
        // req.body to .create() method
        uploadData.append('avatar', e.target.files[0]);
        try {
            const responseDB = await service.handleUpload(uploadData);
            console.log('response is: ', responseDB);
            setUser({ ...user, avatar: responseDB.secure_url });
            console.log('avatar', user.avatar);
        } catch (err) {
            console.log('Error while adding the thing: ', err);
        }
    };

    return (
        <div className={style.Home}>
            <header>
                {user !== '' && (
                    <>
                        <div className={style.Avatar}>
                            <h1>Futura</h1>
                            {user.avatar ? (
                                <>
                                    <img
                                        src={user.avatar}
                                        alt="user-avatar"
                                        onClick={(e) => handleFileUpload(e)}
                                    />
                                    {/* <label htmlFor={style.FileLoader}>
                                        <img
                                            src={user.avatar}
                                            alt="user-avatar"
                                            onClick={(e) => handleFileUpload(e)}
                                        />
                                    </label>
                                    <input
                                        id={style.FileLoader}
                                        type="file"
                                        name="avatar"
                                        value={user.avatar}
                                        onChange={(e) => handleFileUpload(e)}
                                    /> */}
                                </>
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
                        </div>
                        <MenuIcon
                            style={{
                                fontSize: '2rem',
                                display: 'flex',
                                justifySelf: 'flex-start',
                                alignSelf: 'flex-start',
                                position: 'fixed',
                                right: '7%',
                                top: '3%',
                            }}
                            onClick={toggleDrawer}
                        />
                    </>
                )}
                <img src="assets/sea-img.png" alt="sea-img" />
            </header>

            {!user ? (
                <Route
                    exact
                    path="/"
                    render={(props) => (
                        <Login
                            {...props}
                            setUser={setUser}
                            // setIsSignup={setIsSignup}
                            // setForgotPassword={setForgotPassword}
                        />
                    )}
                />
            ) : (
                <Route
                    exact
                    path="/"
                    render={(props) => <Profile {...props} user={user} />}
                />
            )}
        </div>
    );
};

export default Home;
