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
        // console.log('deposit', deposit);
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
            <div className={style.CardsContainer}>
                <table className={style.Card}>
                    <tbody>{displayHistory}</tbody>
                </table>
            </div>
        </div>
    );
};

export default RecycleHistory;
