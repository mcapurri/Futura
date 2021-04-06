import React from 'react';
import style from './Home.module.css';
import { Route } from 'react-router-dom';
import service from '../../utils/service';
import axios from 'axios';
import Login from '../../components/Auth/Login/Login';
import Footer from '../../components/Footer/Footer';
// import Signup from '../../components/Auth/Signup/Signup';
// import ForgotPassword from '../../components/Auth/ForgotPassword/ForgotPassword';
import Profile from '../../components/Profile/Profile';

import { AiOutlineLogout as LogoutIcon } from 'react-icons/ai';
import { ImUserPlus } from 'react-icons/im';

const Home = ({ user, setUser, handleLogout, ...props }) => {
    console.log('user', user);
    // const [isSignup, setIsSignup] = useState(false);
    // const [forgotPassword, setForgotPassword] = useState(false);

    // const handleSubmit = () => {
    //     // event.preventDefault();
    //     console.log('update');
    //     axios
    //         .put(`/api/user/${user._id}`, {
    //             ...user,
    //         })
    //         .then((response) => {
    //             // props.history.push(/);
    //             console.log('User successfully updated');
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    // const handleSubmit = () => {
    //     // event.preventDefault();

    //     console.log('data im sending', user);
    //     service
    //         .saveNewThing(user)
    //         .then((res) => {
    //             console.log('added: ', res.message);
    //         })
    //         .catch((err) => {
    //             console.log('Error while adding the thing: ', err);
    //         });
    // };

    // const handleFileUpload = (e) => {
    //     console.log('The file to be uploaded is: ', e.target.files[0]);

    //     const uploadData = new FormData();
    //     // imageUrl => this name has to be the same as in the model since we pass
    //     // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    //     uploadData.append('avatar', e.target.files[0]);

    //     service
    //         .handleUpload(uploadData)
    //         .then((response) => {
    //             console.log('response is: ', response);
    //             // after the console.log we can see that response carries 'secure_url' which we can use to update the state
    //             setUser({ ...user, avatar: response.secure_url });
    //         })
    //         .then(() => {
    //             console.log('avatar', user.avatar);
    //             service
    //                 .saveNewThing(user._id, user.avatar)
    //                 .then((res) => {
    //                     console.log('added: ', res.message);
    //                 })
    //                 .catch((err) => {
    //                     console.log('Error while adding the thing: ', err);
    //                 });
    //         })
    //         .catch((err) => {
    //             console.log('Error while uploading the file: ', err);
    //         });
    // };

    const handleFileUpload = async (e) => {
        console.log('The file to be uploaded is: ', e.target.files[0]);

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create' POST route
        uploadData.append('avatar', e.target.files[0]);
        try {
            const responseDB = await service.handleUpload(uploadData);
            console.log('response is: ', responseDB);
            setUser({ ...user, avatar: responseDB.secure_url });
            console.log('avatar', user.avatar);
            const responsePut = await service.saveNewThing(
                user._id,
                user.avatar
            );
            console.log('added: ', responsePut.message);
        } catch (err) {
            console.log('Error while adding the thing: ', err);
        }
    };

    return (
        <div className={style.Home}>
            <header>
                {user && (
                    <>
                        <div className={style.Avatar}>
                            <input
                                type="file"
                                name="avatar"
                                // style={{ display: 'none' }}
                                // className={style.Avatar}
                                value={''}
                                onChange={(e) => handleFileUpload(e)}
                            />
                            {user.avatar ? (
                                <img src={user.avatar} alt="user-avatar" />
                            ) : (
                                <h1
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '2.5rem',
                                    }}
                                >
                                    <ImUserPlus />
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
