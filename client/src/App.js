import './App.css';
import { useState } from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Signup from './components/Signup/Signup';

function App(props) {
    const [user, setUser] = useState(props.user || '');
    console.log('user', user);

    return (
        <>
            <Route
                exact
                path="/"
                render={(props) => (
                    <Home {...props} user={user} setUser={setUser} />
                )}
            />

            <Route
                exact
                path="/signup"
                render={(props) => (
                    <Signup {...props} user={user} setUser={setUser} />
                )}
            />
        </>
    );
}

export default App;
