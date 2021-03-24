import React from 'react';
import styles from './Music.module.css';
import {connect} from "react-redux";

const Music = (props) => {
    return (
        <div className={styles.content}>
            <span className={styles.musicHeader}>My music</span>
            {props.music.map(m => {
                    return <div className={styles.audioBlock}>
                        <div>{m.musicName}</div>
                        <audio controls src={m.srcMusic} className={styles.audio}></audio>
                    </div>
                }
            )}
        </div>
    )
}

const mapStateToProps = (store) => ({
    music: store.music.music
})

export default connect(mapStateToProps, {})(Music);