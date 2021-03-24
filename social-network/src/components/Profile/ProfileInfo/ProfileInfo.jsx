import React, {useState} from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import userPhoto from "../../../assets/images/noimg.png"
import facebook from "../../../assets/images/facebook.png"
import github from "../../../assets/images/github.png"
import instagram from "../../../assets/images/instagram.png"
import mainLink from "../../../assets/images/mainLink.png"
import twitter from "../../../assets/images/twitter.png"
import vk from "../../../assets/images/vk.png"
import website from "../../../assets/images/website.png"
import youtube from "../../../assets/images/youtube.png"
import gear from "../../../assets/images/gear.png"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import yes from "../../../assets/images/yes.png";
import no from "../../../assets/images/no.png";

let iconsPaths = {
    facebook: facebook,
    github: github,
    instagram: instagram,
    mainLink: mainLink,
    twitter: twitter,
    vk: vk,
    website: website,
    youtube: youtube
};

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false);
        });
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.photoContainer}>
                <img
                    src={props.profile.photos.large ? props.profile.photos.large : userPhoto}
                    className={styles.mainPhoto}/>
                <div>
                    {props.isOwner && <div>
                        <input type={'file'} id='file' name='file' className={styles.inputFile}
                               onChange={props.onMainPhotoSelected}/>
                        <label htmlFor='file' className={styles.labelForFile}>Choose a file</label>
                    </div>}
                </div>
            </div>
            <div className={styles.descriptionBlock}>
                {
                    editMode
                        ? <ProfileDataForm initialValues={props.profile}
                                           profile={props.profile}
                                           onMainPhotoSelected={onMainPhotoSelected}
                                           isOwner={props.isOwner}
                                           setEditMode={() => {
                                               setEditMode(true)
                                           }}
                                           onSubmit={onSubmit}/>
                        : <ProfileData
                            status={props.status}
                            profile={props.profile}
                            updateStatus={props.updateStatus}
                            onMainPhotoSelected={onMainPhotoSelected}
                            isOwner={props.isOwner}
                            setEditMode={() => {
                                setEditMode(true)
                            }}/>
                }
            </div>
        </div>
    );
}

const ProfileData = (props) => {
    return <div className={styles.profileData}>
        <div>
            {props.isOwner &&
            <div className={styles.editButton}>
                <div>
                    Edit profile page
                </div>
                <div>
                    <input type={'button'} id='edit' name='edit' className={styles.inputFile}
                           onClick={props.setEditMode}/>
                    <label htmlFor='edit' className={styles.labelForEdit}><img src={gear} className={styles.gear}/></label>
                </div>
            </div>
            }
        </div>
        <div>
            <span className={styles.fullName}>{props.profile.fullName}</span>
        </div>
            <div>
                <ProfileStatusWithHooks status={props.status}
                                        updateStatus={props.updateStatus}
                                        profile={props.profile}
                                        isOwner={props.isOwner}
                />
            </div>
        <div className={styles.aboutMe}>
            <div>
                <b>Looking for a job</b>: {
                props.profile.lookingForAJob ?
                    <img src={yes} height="15px"/> :
                    <img src={no} height="15px"/>
            }
            </div>
            <div>
                <b>Professional skills</b>: {props.profile.lookingForAJobDescription}
            </div>
            <div>
                <b>About me</b>: {props.profile.aboutMe}
            </div>
        </div>
        <div className={styles.myContacts}>
            <b>Мои контакты</b>:
            <div className={styles.allContacts}>
                {Object.keys(props.profile.contacts).map(key => {
                    return <div key={key}>
                        <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                    </div>
                })}
            </div>
        </div>
    </div>
}

export const Contact = ({contactTitle, contactValue}) => {

    return <div className={styles.oneContact}>
        <div>
            <img src={iconsPaths[contactTitle]} className={styles.icons}/>
        </div>
        <div>
            <b>{contactTitle}</b>: {contactValue ? contactValue : 'отсутствует'}
        </div>

    </div>
}

export default ProfileInfo;