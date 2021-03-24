
let initialState = {
    style: 'background-color: #A8B0BB'
}

const CHANGE_COLOR = 'social-network/settings/CHANGE_COLOR';

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {

        case CHANGE_COLOR: {
            return {
                ...state,
                style: action.color
            }
        }

        default:
            return state;
    }
}

export const changeColor = (color) => ({type: CHANGE_COLOR, color});

export default settingsReducer;