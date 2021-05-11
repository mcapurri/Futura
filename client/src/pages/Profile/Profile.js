import React from 'react';
import { Button } from 'bootstrap-4-react';
import style from './Profile.module.css';
import { ImUserPlus } from 'react-icons/im';
import axios from '../../utils/axios';

const Profile = ({ user, setUser, ...props }) => {
    const handleFileUpload = async (e) => {
        console.log('The file to be uploaded is: ', e.target.files[0]);

        const uploadData = new FormData();
        // avatar => this name has to be the same as in the model since I pass
        // req.body to .create() method
        uploadData.append('avatar', e.target.files[0]);

        try {
            // const fileUpload = await service.handleUpload(uploadData, user._id);

            const fileUpload = await axios.post(
                `/users/upload/${user._id}`,
                uploadData
            );

            console.log('uploaded file is: ', fileUpload.secure_url);
            await setUser({ ...user, avatar: fileUpload.secure_url });
            console.log('avatar', user.avatar);
        } catch (err) {
            throw err;
        }
    };

    return (
        <div className={style.Profile}>
            <section className={style.Showcase}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        marginTop: '5%',
                        width: '100%',
                    }}
                >
                    <h1 style={{ marginLeft: '6%' }}>
                        Hello {user.firstName},
                    </h1>
                    <div className={style.Avatar}>
                        {user?.avatar ? (
                            <div>
                                <label htmlFor={style.FileLoader}>
                                    <img src={user.avatar} alt="user-avatar" />
                                </label>
                                <input
                                    id={style.FileLoader}
                                    type="file"
                                    name="avatar"
                                    onChange={(e) => handleFileUpload(e)}
                                />
                            </div>
                        ) : (
                            <h1
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '2.5rem',
                                }}
                            >
                                <label htmlFor={style.FileLoader}>
                                    <ImUserPlus
                                        style={{ fontSize: '2.7rem' }}
                                    />
                                </label>
                                <input
                                    id={style.FileLoader}
                                    type="file"
                                    name="avatar"
                                    value={user.avatar}
                                    onChange={(e) => handleFileUpload(e)}
                                />
                            </h1>
                        )}
                    </div>
                </div>
                <div className={style.Content}>
                    <p>We are so proud of you!</p>
                    <p>
                        You have already helped us to collect{' '}
                        {user.totalDeposited.toString()} Kilograms of recyclable
                        meterial.
                    </p>
                    <p>Thank you!</p>
                </div>
            </section>
            <section className={style.Dropoffs}>
                <div style={{ width: '100%' }}>
                    <p>
                        Display on the map all the recycling points near you.
                        <br />
                    </p>
                    <p>Happy recycling!</p>
                </div>
                <Button onClick={() => props.history.push('/map')}>
                    {' '}
                    <img
                        src="assets/search-logo.png"
                        alt="search-logo"
                        style={{
                            width: '1.3rem',
                            marginRight: '5%',
                            color: 'rgb(5, 58, 32)',
                        }}
                    />
                    Map
                </Button>
            </section>
        </div>
    );
};

export default Profile;
