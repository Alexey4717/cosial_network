import React from "react";
import {createField} from "../../common/FormsControls/FormsControls";
import {Field, reduxForm} from "redux-form";
import style from "../../common/FormsControls/FormsControls.module.css";

const ProfileDataForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            {props.isOwner && <button onClick={props.setEditMode} className={style.setButton}>save</button>}
        </div>
        {props.error && <div className={style.formSummaryError}>
            {props.error}
        </div>}
        <div className={style.fields}>
            <div className={style.field}>
                <b>Полное имя:</b> {createField("Full name", "fullName", [], 'input')}
            </div>
            <div className={style.field}>
                <b>lookingForAJob:</b>
                {createField("", "lookingForAJob", [], 'input', {type: 'checkbox'})}
            </div>
            <div className={style.field}>
                <b>Professional skills:</b>
                {createField("Description", "lookingForAJobDescription", [], 'textarea')}
            </div>
            <div className={style.field}>
                <b>About me:</b>
                {createField("About me", "aboutMe", [], 'textarea')}
            </div>
            <div>
                <b>Мои контакты:</b>{Object.keys(props.profile.contacts).map(key => {
                return <div key={key} className={style.field}>
                    <b>{key}:</b> {createField(key, "contacts." + key, [], 'input')}
                </div>
            })}
            </div>
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'editProfile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;