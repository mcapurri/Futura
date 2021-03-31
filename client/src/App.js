import './App.css';
import { useState } from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home/Home';

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
        </>
    );
}

export default App;
