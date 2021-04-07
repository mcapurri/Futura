import React from 'react';
import style from './SideDrawer.module.css';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

const SideDrawer = ({ drawerOpen, toggleDrawer }) => {
    let attachedStyles = [];
    {
        drawerOpen
            ? (attachedStyles = [style.SideDrawer, style.Open])
            : (attachedStyles = [style.SideDrawer, style.Close]);
    }
    return (
        <>
            <Backdrop toggleDrawer={toggleDrawer} />
            <div className={attachedStyles.join(' ')}></div>
        </>
    );
};

export default SideDrawer;
