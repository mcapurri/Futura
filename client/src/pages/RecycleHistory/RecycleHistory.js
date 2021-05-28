import React, { useState, useEffect } from 'react';
import style from './RecycleHistory.module.css';
import axios from '../../utils/axios';
import Spinner from '../../components/UI/Spinner/Spinner';

const RecycleHistory = (props) => {
    const [depositsList, setDepositslist] = useState([]);

    // console.log('depositsList', depositsList);

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
        var date = new Date(deposit.createdAt);

        return (
            <tr key={deposit._id} className={style.Deposit}>
                <td>
                    <b>Deposited on</b> {date.toLocaleDateString()}{' '}
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

    if (!depositsList) return <Spinner />;

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
