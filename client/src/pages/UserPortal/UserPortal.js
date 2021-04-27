import React, { useState } from 'react';
import style from './UserPortal.module.css';
import { PayPalButton } from 'react-paypal-button-v2';

const UserPortal = () => {
    const [userBalance, setUserBalence] = useState(0);
    const handleTransfer = () => {};
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
            {/* <PayPalButton
                amount={userBalance}
                onSuccess={handleTransfer}
            ></PayPalButton> */}
            <PayPalButton
                amount="0.01"
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details, data) => {
                    alert(
                        'Transaction completed by ' +
                            details.payer.name.given_name
                    );

                    // OPTIONAL: Call your server to save the transaction
                    return fetch('/paypal-transaction-complete', {
                        method: 'post',
                        body: JSON.stringify({
                            orderID: data.orderID,
                        }),
                    });
                }}
            />
        </div>
    );
};

export default UserPortal;
