import styles from './Post.module.css';
import heart from "./../../../../assets/images/heart.png";
import like from "./../../../../assets/images/like.png";

const Post = (props) => {

    if (!props.profile) {
        return null
    }

    return (
        <div className={styles.item}>
            <div>
                <img className={styles.postImg}
                     src={props.profile.photos.large}/>
            </div>
            <div>
                <div className={styles.message}>
                    {props.massage}
                </div>
                <div className={styles.likes}>
                    <div>
                        <button>
                            like&nbsp;
                            <img src={like} className={styles.heart}/>
                        </button>
                    </div>
                    <div>
                        {props.like_counts}
                        <img src={heart} className={styles.heart}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;