import React from 'react';
import style from './Home.module.css';
import { Route } from 'react-router-dom';
import Login from '../../components/Auth/Login/Login';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../../utils/ProtectedRoute';
// import { TiThMenu as MenuIcon } from 'react-icons/ti';

const Home = ({ user, setUser, handleLogout, toggleDrawer, ...props }) => {
    console.log('user', user);
    return (
        <div className={style.Home}>
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
