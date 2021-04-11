import React from 'react';
import style from './UserPortal.module.css';
const UserPortal = () => {
    return (
        <div className={style.UserPortal}>
            <header>
                <h2>Current balance: </h2>
                <h2>€4,80</h2>
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
