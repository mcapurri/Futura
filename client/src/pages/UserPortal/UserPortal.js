import React, { useState } from 'react';
import style from './UserPortal.module.css';
import { ImUserPlus } from 'react-icons/im';

const UserPortal = ({ user, ...props }) => {
    // const [userBalance, setUserBalance] = useState(0);
    // const handleTransfer = () => {};
    return (
        <div className={style.UserPortal}>
            <header>
                <div className={style.Logo}>
                    <img
                        src="assets/africa-recycle-logo.png"
                        alt="recycle-logo"
                    />
                    <h1>!</h1>
                </div>
                {props.width > '600' && (
                    <p
                        style={{
                            marginRight: '15%',
                        }}
                    >
                        It's all about what you do for our future...{' '}
                    </p>
                )}
            </header>
            <section className={style.Showcase}>
                <div
                    style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                    <h3 style={{ marginLeft: '10%' }}>
                        Hello {user.firstName},
                    </h3>
                    <div className={style.Avatar}>
                        {user?.avatar ? (
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
                </div>
                <div className={style.Values}>
                    <div className={style.Row}>
                        <label htmlFor="left">Total weight</label>
                        <div className={style.Display} id="left">
                            48 kg
                        </div>
                    </div>
                    <div className={style.Row}>
                        <label htmlFor="right">Current payout</label>
                        <div className={style.Display} id="right">
                            ₦ 4.800
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserPortal;
