import React, {useEffect, useState} from 'react';
import styles from "./ProfileInfo.module.css";

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    let activateEditMode = () => {
        setEditMode(true);
    }

    let deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    let onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <>
            {
                !editMode && props.isOwner &&
            <div className={styles.status}>
                <div>
                <span onDoubleClick={activateEditMode}>
                    {props.status ? props.status : 'Empty status'}
                </span>
                </div>
                <div className={styles.statusDescription}>
                    Press double-click and then blur to change status.
                </div>
            </div>
            }

            {
                editMode && props.isOwner &&
            <div>
                <input autoFocus={true} onBlur={deactivateEditMode}
                       value={status} onChange={onStatusChange}/>
            </div>
            }

            {
                !props.isOwner &&
                <div>
                <span>
                    {props.status ? props.status : 'Empty status'}
                </span>
                </div>
            }
        </>
    );
}

export default ProfileStatusWithHooks;