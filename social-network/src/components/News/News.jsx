import React from 'react';
import style from './News.module.css';
import {connect} from "react-redux";
import heart from "../../assets/images/heart.png";
import like from "../../assets/images/like.png";

const News = (props) => {
    return (
        <div className={style.content}>
            <div className={style.whatNew}>What new?</div>
            <article>
                {props.newsPosts.map(p => {
                    return <section id={p.id} className={style.newsContainer}>
                        <div className={style.header}>
                            <div>
                                <img src={p.userPhoto} className={style.userPhoto}/>
                            </div>
                            <div className={style.headerContent}>
                                <div className={style.usersAndHeaders}>
                                    <div className={style.user}>{p.user}</div>
                                    <div className={style.postName}>{p.postName}</div>
                                </div>
                                <div className={style.postTime}>{p.postTime}</div>
                            </div>
                        </div>
                        <div className={style.postContent}>
                            <div>
                                <img src={p.postImage} className={style.postImg}/>
                            </div>
                            <div>{p.postBody}</div>
                        </div>
                        <div className={style.likes}>
                            <button>
                                like&nbsp;
                                <img src={like} className={style.heart}/>
                            </button>
                            <img src={heart} className={style.heart}/>
                            <div>{p.likesCount}</div>
                        </div>
                    </section>
                })}
            </article>
        </div>
    )
}

const mapStateToProps = (state) => ({
    newsPosts: state.news.newsPosts
})

export default connect(mapStateToProps, {})(News);