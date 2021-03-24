import React from 'react';
import styles from './Header.module.css';
import social_network_logo from "../../assets/images/social_network_logo.jpg";
import {connect} from "react-redux";
import {Paginator} from "../Users/Paginator/Paginator";

const Header = (props) => {
    if (!props.isAuth) {
        return <Paginator />
    }

    return (
        <header className={styles.header}>
            <img
                className={styles.headerImg}
                src={social_network_logo}/>
            <div className={styles.loginBlock}>
                {props.isAuth
                    ? <div className={styles.isLoginBlock}>
                        <div>
                            {<img src={props.myPhoto} className={styles.userPhoto}/>}
                        </div>
                        <div>
                            <div className={styles.loginName}>
                                {props.login}
                            </div>
                            <button onClick={props.logout} className={styles.loginButton}>
                                Logout
                            </button>
                        </div>
                    </div>
                    : null}
            </div>
        </header>
    )
}

export default Header;