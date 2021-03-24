import React from 'react';
import {
    setCurrentPage,
    toggleFollowingProgress,
    getUsersTC, followTC, unfollowTC, getPageChangeTC, setPortionNumber
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSuper
} from "../../redux/users-selectors";

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsersTC(pageNumber, this.props.pageSize);

       /* this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(response => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.items) */

        };

    render() {

        return <>
            { this.props.isFetching ? <Preloader /> : null }
            <Users totalItemsCount={this.props.totalItemsCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   previousPortion={this.previousPortion}
                   users={this.props.users}
                   followTC={this.props.followTC}
                   unfollowTC={this.props.unfollowTC}
                   followingInProgress={this.props.followingInProgress}
                   portionSize={this.props.portionSize}
            />
        </>

    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersSuper(state),
        //users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: state.usersPage.portionSize
    }
}

export default compose(
    connect(mapStateToProps, {
        setCurrentPage,
        toggleFollowingProgress,
        getUsersTC,
        followTC,
        unfollowTC
    }),
)(UsersAPIComponent);