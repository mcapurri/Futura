import './App.css';
import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { logout } from './utils/auth';
import ProtectedRoute from './utils/ProtectedRoute';
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
import Chat from './pages/Chat/Chat';
import ChatRoom from './pages/Chat/ChatRoom/ChatRoom';

function App(props) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    // const [width, setWidth] = useState(window.innerWidth);

    const [user, setUser] = useState(props.user);
    console.log('user', user);

    const toggleDrawer = () => {
        setDrawerOpen(() => !drawerOpen);
    };
    const handleLogout = () =>
        logout()
            .then(() => {
                setUser(() => '');
                localStorage.removeItem('token');
            })
            .catch((err) => {
                console.log(err);
            });

    // // Check if mobile
    // // const handleWindowSizeChange = () => {
    // //     setWidth(window.innerWidth);
    // // };
    // // useEffect(() => {
    // //     window.addEventListener('resize', handleWindowSizeChange);
    // //     window.resizeTo(360, 740);
    // //     return () => {
    // //         window.removeEventListener('resize', handleWindowSizeChange);
    // //     };
    // // }, []);

    // let isMobile = width <= 360;
    return (
        <>
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
                <ProtectedRoute
                    exact
                    path="/user-portal"
                    component={UserPortal}
                    user={user}
                />
                <ProtectedRoute
                    exact
                    path="/chat"
                    component={Chat}
                    user={user}
                />
                <ProtectedRoute
                    exact
                    path="/chat/:roomId"
                    component={ChatRoom}
                    user={user}
                />

                <ProtectedRoute
                    exact
                    path="/resources/website"
                    component={Website}
                    user={user}
                />

                <ProtectedRoute
                    exact
                    path="/resources/news"
                    component={News}
                    user={user}
                />

                <ProtectedRoute exact path="/map" component={Map} user={user} />

                <ProtectedRoute
                    exact
                    path="/create-dropoff"
                    component={CreateDropOff}
                    user={user}
                />
            </Switch>
            {user && <Footer />}
        </>
    );
}

export default App;
