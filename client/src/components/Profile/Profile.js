import React from 'react';
import { Button } from 'bootstrap-4-react';
// import { service } from '../../utils/service';
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
                    style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                    <h3 style={{ marginLeft: '10%' }}>
                        Hello {user.firstName},
                    </h3>
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
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '100%',
                    }}
                >
                    <div>
                        <label htmlFor="left">Total weight</label>
                        <div className={style.Display} id="left">
                            48 kg
                        </div>
                    </div>
                    <div>
                        <label htmlFor="right">Current payout</label>
                        <div className={style.Display} id="right">
                            ₦ 4.800
                        </div>
                    </div>
                </div>
            </section>
            <Button onClick={() => props.history.push('/map')}>
                Drop-offs near you
            </Button>
        </div>
    );
};

export default Profile;
