import './App.css';
import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { logout } from './utils/auth';

import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
// import Resources from './pages/Resources/Resources';
import Website from './pages/Resources/Website';
import News from './pages/Resources/News';
import Chat from './pages/Chat/Chat';
import Signup from './components/Auth/Signup/Signup';
import ForgotPassword from './components/Auth/Recovery_Email/ForgotPassword';
import ResetPassword from './components/Auth/Recovery_Email/ResetPassword';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Map from './components/Map/Map';

function App(props) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [user, setUser] = useState({
        ...props.user,
        avatar: props.user.avatar,
    });
    console.log('user', user);
    console.log('drawerOpen', drawerOpen);

    const toggleDrawer = () => {
        setDrawerOpen(() => !drawerOpen);
        console.log('toggleDrawer');
    };
    const handleLogout = () =>
        logout()
            .then(() => {
                setUser(() => '');
            })
            .catch((err) => {
                console.log(err);
            });

    return (
        <>
            {drawerOpen && (
                <SideDrawer
                    drawerOpen={drawerOpen}
                    toggleDrawer={toggleDrawer}
                />
            )}

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
                            toggleDrawer={toggleDrawer}
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
                <Route
                    exact
                    path="/chat"
                    render={(props) => <Chat {...props} />}
                />
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
                <Route
                    exact
                    path="/map"
                    render={(props) => <Map {...props} />}
                />
            </Switch>
            {user && <Footer history={props.history} drawerOpen={drawerOpen} />}
        </>
    );
}

export default App;
