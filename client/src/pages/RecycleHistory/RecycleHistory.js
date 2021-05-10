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
        </div>
    );
};

export default RecycleHistory;
