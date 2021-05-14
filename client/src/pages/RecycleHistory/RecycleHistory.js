import React, { useState, useEffect } from 'react';
import style from './RecycleHistory.module.css';
import axios from '../../utils/axios';

const RecycleHistory = (props) => {
    const [depositsList, setDepositslist] = useState([]);

    console.log('depositsList', depositsList);

    const fetchData = async () => {
        try {
            const deposits = await axios.get(`/api/deposits/${props.user._id}`);
            setDepositslist(deposits.data);
        } catch (err) {
            throw err;
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const displayHistory = depositsList?.map((deposit) => {
        console.log('deposit', deposit);
        return (
            <tr key={deposit._id} className={style.Deposit}>
                <td>
                    <b>Deposited on</b> {deposit.createdAt}
                </td>
                <td>
                    <b>at our </b> {deposit.location} <b>e-point</b>
                </td>
                <td>
                    <b>Kg.</b> {deposit.kgDeposited}
                </td>
                <td>
                    <b>Credit $</b> {deposit.credit}
                </td>
            </tr>
        );
    });

    return (
        <div className={style.Container}>
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
            <div className={style.CardsContainer}>
                <table className={style.Card}>{displayHistory}</table>
            </div>
        </div>
    );
};

export default RecycleHistory;
