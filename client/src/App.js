import './App.css';
import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { logout } from './utils/auth';

import Home from './pages/Home/Home';
// import Resources from './pages/Resources/Resources';
import Website from './pages/Resources/Website';
import News from './pages/Resources/News';
import Chat from './pages/Chat/Chat';
import Signup from './components/Auth/Signup/Signup';
import ForgotPassword from './components/Auth/Recovery_Email/ForgotPassword';
import ResetPassword from './components/Auth/Recovery_Email/ResetPassword';
import Map from './components/Map/Map';

function App(props) {
    const [user, setUser] = useState({
        ...props.user,
        avatar: props.user.avatar,
    });
    // const [isSignup, setIsSignup] = useState(false);
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
                render={(props) => <Signup {...props} setUser={setUser} />}
            />
            <Route
                exact
                path="/forgotpassword"
                render={(props) => <ForgotPassword {...props} />}
                // component={ForgotPassword}
            />
            <Route
                exact
                path="/resetpassword/:resettoken"
                render={(props) => <ResetPassword {...props} />}
                // component={ResetPassword}
            />
            <Route exact path="/chat" render={(props) => <Chat {...props} />} />
            <Route
                exact
                path="/resources/website"
                render={(props) => <Website {...props} />}
            />

            <Route
                exact
                path="/resources/news"
                render={(props) => <News {...props} />}
            />
            <Route exact path="/map" render={(props) => <Map {...props} />} />
        </Switch>
    );
}

export default App;
