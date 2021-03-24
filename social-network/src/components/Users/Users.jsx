import React from 'react';
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/noimg.png";
import {NavLink} from "react-router-dom";
import {Paginator} from "./Paginator/Paginator";

const Users = (props) => {
    return (
        <div>
            <Paginator
                totalItemsCount={props.totalItemsCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
                portionSize={props.portionSize}/>

            {
                props.users.map(u => <div key={u.id} className={styles.userContainer}>
                            <div>
                                <NavLink to={'/profile/' + u.id}>
                                    <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                         className={styles.userPhoto}/>
                                </NavLink>
                            </div>
                            <div className={styles.usersData}>
                                <div>
                                    <div className={styles.usersName}>{u.name}</div>
                                    <div className={styles.usersStatus}>{u.status}</div>
                                </div>
                                <div className={styles.followButton}>
                                    {u.followed

                                        ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                                  onClick={() => {
                                                      props.unfollowTC(u.id);
                                                  }}>Unfollow</button>

                                        : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                                  onClick={() => {
                                                      props.followTC(u.id);
                                                  }}>Follow</button>}
                                </div>
                            </div>
                    </div>
                )
            }
        </div>
    )
}

export default Users;