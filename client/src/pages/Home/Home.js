import React, { useState } from 'react';
import style from './Home.module.css';
import { Route } from 'react-router-dom';
import service from '../../utils/service';
import axios from 'axios';
import Login from '../../components/Auth/Login/Login';
import Profile from '../../components/Profile/Profile';
import ConfirmationModal from '../../components/UI/Modal/ConfirmationModal';

import { TiThMenu as MenuIcon } from 'react-icons/ti';
import { ImUserPlus } from 'react-icons/im';

const Home = ({ user, setUser, handleLogout, toggleDrawer, ...props }) => {
    console.log('user', user);

    const [showModal, setShowModal] = useState(false);

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
    const handleSubmit = (e) => {
        e.preventDefault();
        service
            .saveNewThing(user._id, user.avatar)
            .then((res) => {
                console.log('added: ', res.message);
            })
            .catch((err) => {
                console.log('Error while adding the thing: ', err);
            });
    };
    const handleClose = () => {
        setShowModal(false);
    };

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
            // const responsePut = await service.saveNewThing(
            //     user._id,
            //     user.avatar
            // );
            // console.log('added: ', responsePut.message);
            setShowModal(true);
        } catch (err) {
            console.log('Error while adding the thing: ', err);
        }
    };

    return (
        <div className={style.Home}>
            {showModal && (
                <ConfirmationModal
                    handleSubmit={handleSubmit}
                    handleClose={handleClose}
                />
            )}
            <header>
                {user !== '' && (
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
                        <MenuIcon
                            style={{
                                fontSize: '2rem',
                                display: 'flex',
                                justifySelf: 'flex-start',
                                alignSelf: 'flex-start',
                                position: 'fixed',
                                right: '7%',
                                top: '3%',
                            }}
                            onClick={toggleDrawer}
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
                <Route
                    exact
                    path="/"
                    render={(props) => <Profile {...props} user={user} />}
                />
            )}
        </div>
    );
};

export default Home;
