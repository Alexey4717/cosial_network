import React from 'react';
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class HeaderContainer extends React.Component {

    render() {
        return (
            <Header { ...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    profile: state.profilePage.profile,
    myPhoto: state.profilePage.myPhoto,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId
});

export default compose (
    connect (mapStateToProps, {logout, updateStatus, savePhoto, saveProfile}),
    withRouter
)(HeaderContainer);

