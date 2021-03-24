import React from 'react';
import './App.module.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from './components/Music/Music.jsx';
import Settings from "./components/Settings/Settings";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import styles from './App.module.css'
import {Helmet} from "react-helmet";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));

class App extends React.Component {

    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        alert('some error occured');
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        //если не проинициализировались, показать загрузку
        if (!this.props.initialized) {
            return <Preloader/>
        }

        //когда проинициализировались, показать app
        return (
            <div>
                <Helmet bodyAttributes={this.props.bgColor}/>
                <div className={styles.appWrapper}>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className={styles.appWrapperContent}>
                        <Switch>
                            <Route exact path='/'
                                   render={() => <Redirect to={'/profile'}/>}/>
                            <Route path='/dialogs'
                                   render={withSuspense(DialogsContainer)}/>
                            <Route path='/profile/:userId?'
                                   render={() => <ProfileContainer/>}/>
                            <Route path='/users'
                                   render={withSuspense(UsersContainer)}/>
                            <Route path='/login'
                                   render={() => <Login/>}/>
                            <Route path='/news' component={News}/>
                            <Route path='/music' component={Music}/>
                            <Route path='/settings' component={Settings}/>
                        </Switch>
                    </div>
                </div>
                <div className={styles.copyright}>Social Network &#169; 2021</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    bgColor: state.settings
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);






