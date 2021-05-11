import React from 'react';
import style from './UserPortal.module.css';
import { ImUserPlus } from 'react-icons/im';
import { Form, Button } from 'bootstrap-4-react';
import axios from '../../utils/axios';
import useInput from '../../utils/useInput';

const UserPortal = ({ user, ...props }) => {
    const [transferAmount, setTransferAmount] = useInput(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post(
            '/api/deposits/transfer',
            transferAmount
        );
        console.log('responseDB', data);
    };

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
                    className={style.Row}
                    style={{
                        alignItems: 'center',
                        margin: '5% 0',
                    }}
                >
                    <h3 style={{ color: '#eee' }}>
                        {user.firstName} {user.lastName}
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
                {/* <section> */}
                <div className={style.Values}>
                    <div className={style.Row}>
                        <label htmlFor="right">Current Balance</label>
                        <div className={style.Display}>
                            {`${user.balance} $`}
                        </div>
                    </div>

                    <div className={style.Row}>
                        <label htmlFor="left">Total Recycled</label>
                        <div className={style.Display}>
                            {`${user.totalRecycled} Kg.`}
                        </div>
                    </div>

                    <div className={style.Row}>
                        <label htmlFor="left">Total Earnings</label>
                        <div className={style.Display}>
                            {`${user.totalEarned} $`}
                        </div>
                    </div>
                </div>
                {/* </section> */}
            </section>
            <section className={style.Inputcase}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className={style.Row}>
                        <label htmlFor="amount">Pay out</label>
                        <Form.Input
                            className={style.Display}
                            name={'amount'}
                            value={transferAmount}
                            placeholder={'$$$'}
                        />
                    </Form.Group>
                </Form>
            </section>
        </div>
    );
};

export default UserPortal;
