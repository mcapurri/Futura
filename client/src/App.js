import './App.css';
import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { logout } from './utils/auth';

import Home from './pages/Home/Home';
import Signup from './components/Auth/Signup/Signup';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';

function App(props) {
    const [user, setUser] = useState(props.user || '');
    const [isSignup, setIsSignup] = useState(false);

    console.log('user', user);

    const handleLogout = () =>
        logout()
            .then(() => {
                setUser(() => '');
            })
            .catch((err) => {
                console.log(err);
            });

    return (
        <Switch>
            <Route
                exact
                path="/"
                render={(props) => (
                    <Home
                        {...props}
                        user={user}
                        setUser={setUser}
                        handleLogout={handleLogout}
                    />
                )}
            />
            <Route
                exact
                path="/signup"
                render={(props) => (
                    <Signup
                        {...props}
                        setUser={setUser}
                        isSignup={isSignup}
                        handleLogout={handleLogout}
                    />
                )}
            />
            <Route
                exact
                path="/forgotpassword"
                render={(props) => (
                    <ForgotPassword {...props} handleLogout={handleLogout} />
                )}
            />
        </Switch>
    );
}

export default App;
