import style from './SideDrawer.module.css';
import { Nav, Button } from 'bootstrap-4-react';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import { AiOutlineLogout as LogoutIcon } from 'react-icons/ai';
import { FaUserAlt, FaPlus, FaRecycle } from 'react-icons/fa';

const SideDrawer = ({ drawerOpen, toggleDrawer, handleLogout, user }) => {
    let attachedStyles = style.SideDrawer;
    drawerOpen && (attachedStyles = `${style.SideDrawer} ${style.Open}`);
    return (
        <>
            <Backdrop toggleDrawer={toggleDrawer} />
            <div className={attachedStyles}>
                <div
                    style={{
                        height: '40%',
                        backgroundColor: 'rgb(5, 58, 32)',
                        display: 'flex',
                        alignItems: 'flex-end',
                    }}
                >
                    <div className={style.UserInfos}>
                        <div className={style.Avatar}>
                            {user.avatar && (
                                <img src={user.avatar} alt="user-avatar" />
                            )}
                        </div>
                        <div
                            style={{
                                width: '60%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <p>
                                {user.firstName} {user.lastName}
                            </p>
                            <span>{user.email}</span>
                        </div>
                    </div>
                </div>
                <Nav onClick={toggleDrawer} style={{ height: '60%' }}>
                    <ul>
                        <li>
                            <FaUserAlt style={{ color: 'rgb(9, 173, 7)' }} />
                            <Nav.Link href="/user-portal">User Portal</Nav.Link>
                        </li>
                        <li>
                            <FaPlus style={{ color: 'rgb(9, 173, 7)' }} />
                            <Nav.Link href="/create-dropoff">
                                Add recycling point
                            </Nav.Link>
                        </li>
                        <li>
                            <FaRecycle style={{ color: 'rgb(9, 173, 7)' }} />
                            <Nav.Link href="/recycle-history">
                                Recycle history
                            </Nav.Link>
                        </li>
                        <li>
                            <LogoutIcon style={{ color: 'rgb(9, 173, 7)' }} />
                            <Button onClick={handleLogout}>Logout</Button>
                        </li>
                    </ul>
                </Nav>
            </div>
        </>
    );
};

export default SideDrawer;
