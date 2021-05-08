import React, { useState } from 'react';
import style from './UserPortal.module.css';

const UserPortal = (props) => {
    const [userBalance, setUserBalance] = useState(0);
    const handleTransfer = () => {};
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
            <div style={{ width: '100%' }}>
                <div className={style.UserBalance}>
                    <span>Total earned</span>
                    <span>€75,00</span>
                </div>
                <div className={style.UserBalance}>
                    <span>Total recycled</span>
                    <span>500 Kg</span>
                </div>
            </div>
        </div>
    );
};

export default UserPortal;
