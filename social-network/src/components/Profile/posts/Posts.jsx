import React from 'react';
import styles from './Posts.module.css';
import Post from './post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Element} from "../../common/FormsControls/FormsControls";

const maxLength100 = maxLengthCreator(100)

const Textarea = Element("textarea");

const Posts = React.memo(props => {
    let postElements = props.posts.map(p => <Post profile={props.profile} massage={p.message} key={p.id} like_counts={p.likesCount}/>);

    let onAddPost = (value) => {
        props.addPost(value.postBody);
    }

    return (
        <div className={styles.postBlock}>
            <PostsFormRedux onSubmit={onAddPost} profile={props.profile}/>
            <h3>My Posts</h3>
            <div className={styles.posts}>
                {postElements}
            </div>
        </div>
    )
})

const PostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={styles.addPostForm}>
                <Field component={Textarea} placeholder="Введите пост" name="postBody"
                validate={[required, maxLength100]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
};

const PostsFormRedux = reduxForm ({form: 'addPost'})(PostsForm);

export default Posts;