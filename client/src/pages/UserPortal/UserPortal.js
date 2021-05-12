import React from 'react';
import style from './UserPortal.module.css';
import { ImUserPlus } from 'react-icons/im';
import { Form, Button } from 'bootstrap-4-react';
import axios from '../../utils/axios';
import useInput from '../../utils/useInput';
import { useForm } from 'react-hook-form';

const UserPortal = ({ user, ...props }) => {
    const [transferAmount, setTransferAmount] = useInput('');
    const {
        register,
        // handleSubmit,
        // watch,
        formState: { errors },
    } = useForm();

    console.log('transferAmount', transferAmount);

    const onSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('/api/deposits/transfer', {
            id: user._id,
            transferAmount: +transferAmount,
        });
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
                        marginTop: '5%',
                        marginBottom: '7%',
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
                            {`${user.totalRecycled} Kg`}
                        </div>
                    </div>

                    <div className={style.Row}>
                        <label htmlFor="left">Total Earnings</label>
                        <div className={style.Display}>
                            {`${user.totalEarned} $`}
                        </div>
                    </div>
                </div>
            </section>
            <section className={style.Inputcase}>
                <Form onSubmit={onSubmit} className={style.Form}>
                    <Form.Group
                        className={style.Row}
                        style={{ alignItems: 'flex-end' }}
                    >
                        <label htmlFor="amount">Cash Transfer</label>
                        {/* <InputGroup className={style.InputGroup}> */}
                        {/* <InputGroup.Prepend
                                style={{
                                    height: '2rem',
                                    backgroundColor: 'rgba(255, 215, 0, 0.5)',
                                }}
                            >
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend> */}
                        <div
                            style={{ display: 'flex', alignItems: 'flex-end' }}
                        >
                            <span
                                style={{
                                    marginRight: '5%',
                                    fontSize: '1.2rem',
                                }}
                            >
                                $
                            </span>
                            <Form.Input
                                {...register('amount', {
                                    required: false,
                                    maxLength: 3,
                                })}
                                className={style.Display}
                                value={transferAmount}
                                placeholder={'$$$'}
                                onChange={setTransferAmount}
                            />
                            <span style={{ marginLeft: '3%' }}>,00</span>
                        </div>

                        {/* <InputGroup.Append style={{ height: '2rem' }}>
                            <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup.Append> */}
                        {/* </InputGroup> */}
                    </Form.Group>
                    {errors.amount && <span>Max withdraw 999 $</span>}
                    <Button type="submit">Pay out</Button>
                </Form>
            </section>
        </div>
    );
};

export default UserPortal;
