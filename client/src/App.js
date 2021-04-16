import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { logout } from './utils/auth';

import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Website from './pages/Resources/Website';
import News from './pages/Resources/News';
import UserPortal from './pages/UserPortal/UserPortal';
import CreateDropOff from './pages/CreateDropOff/CreateDropOff';
import Signup from './components/Auth/Signup/Signup';
import ForgotPassword from './components/Auth/Recovery_Email/ForgotPassword';
import ResetPassword from './components/Auth/Recovery_Email/ResetPassword';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Map from './components/Map/Map';

function App(props) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const [user, setUser] = useState(props.user);
    console.log('user', user);
    console.log('drawerOpen', drawerOpen);

    const toggleDrawer = () => {
        setDrawerOpen(() => !drawerOpen);
    };
    const handleLogout = () =>
        logout()
            .then(() => {
                setUser(() => '');
            })
            .catch((err) => {
                console.log(err);
            });

    // Check if mobile
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    let isMobile = width <= 360;
    return (
        <div style={{ width: isMobile ? '100%' : '360px' }}>
            {drawerOpen && (
                <SideDrawer
                    user={user}
                    drawerOpen={drawerOpen}
                    toggleDrawer={toggleDrawer}
                    handleLogout={handleLogout}
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
                    path="/user-portal"
                    render={(props) => <UserPortal {...props} />}
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
                <Route
                    exact
                    path="/create-dropoff"
                    render={(props) => <CreateDropOff {...props} user={user} />}
                />
            </Switch>
            {user && <Footer history={props.history} drawerOpen={drawerOpen} />}
        </div>
    );
}

export default App;
