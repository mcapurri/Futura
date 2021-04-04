import React from 'react';
import style from './Home.module.css';
import { Route } from 'react-router-dom';

import Login from '../../components/Auth/Login/Login';
import Footer from '../../components/Footer/Footer';
// import Signup from '../../components/Auth/Signup/Signup';
// import ForgotPassword from '../../components/Auth/ForgotPassword/ForgotPassword';
import Profile from '../../components/Profile/Profile';

import { AiOutlineLogout as LogoutIcon } from 'react-icons/ai';

const Home = ({ user, setUser, handleLogout, ...props }) => {
    // const [isSignup, setIsSignup] = useState(false);
    // const [forgotPassword, setForgotPassword] = useState(false);

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
                <>
                    <Route
                        exact
                        path="/"
                        render={(props) => <Profile {...props} user={user} />}
                    />
                    <Footer history={props.history} />
                </>
            )}
        </div>
    );
};

export default Home;
