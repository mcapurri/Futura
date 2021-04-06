import React from 'react';
import { Button } from 'bootstrap-4-react';
import style from './Profile.module.css';

const Profile = ({ user, ...props }) => {
    return (
        <div className={style.Profile}>
            <section className={style.Showcase}>
                <h3 style={{ marginLeft: '10%' }}>Hello {user.firstName},</h3>
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
