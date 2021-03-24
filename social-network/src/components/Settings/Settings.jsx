import React from 'react';
import style from './Settings.module.css'
import {connect} from "react-redux";
import cn from "classnames";
import {changeColor} from "../../redux/settings-reducer";

const Settings = (props) => {

    return (
        <div className={style.settings}>
            <div className={style.header}>Select theme-color</div>
            <div className={style.colorsContainers}>
                <div className={cn(style.color, style.black)}
                     onClick={() => props.changeColor('background-color: black')}>
                </div>
                <div className={cn(style.color, style.red)}
                     onClick={() => props.changeColor('background-color: red')}>
                </div>
                <div className={cn(style.color, style.blue)}
                     onClick={() => props.changeColor('background-color: blue')}>
                </div>
                <div className={cn(style.color, style.purple)}
                     onClick={() => props.changeColor('background-color: purple')}>
                </div>
                <div className={cn(style.color, style.orange)}
                     onClick={() => props.changeColor('background-color: #ff8c00')}>
                </div>
                <div className={cn(style.color, style.green)}
                     onClick={() => props.changeColor('background-color: green')}>
                </div>
                <div className={cn(style.color, style.gray)}
                     onClick={() => props.changeColor('background-color: #A8B0BB')}>
                </div>
                <div className={cn(style.color, style.brown)}
                     onClick={() => props.changeColor('background-color: brown')}>
                </div>
                <div className={cn(style.color, style.pink)}
                     onClick={() => props.changeColor('background-color: #dc94a3')}>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    bgColor: state.settings
})

export default connect(mapStateToProps, {changeColor})(Settings);