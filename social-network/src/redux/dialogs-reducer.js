import dmitry from '../assets/images/dmitry.jpg';
import andrey from '../assets/images/andrey.jpg';
import alexey from '../assets/images/alexey.jpg';

const ADD_MESSAGE = 'social-network/dialogs/ADD-MESSAGE';

let initialState = {
    messages: [{id: "1", message: "Hello!"},
        {id: "2", message: "How are you?"},
        {id: "3", message: "How is your React?"}],
    dialogs: [{id: "1", name: "Дмитрий", photo: dmitry},
        {id: "2", name: "Андрей", photo: andrey},
        {id: "3", name: "Алексей", photo: alexey}]
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_MESSAGE: {
            let newMessage = {message: action.newMessageBody};
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''
            }
        }

        default:
            return state;
    }
}

export const addMessageActionCreator = (newMessageBody) => ({type: ADD_MESSAGE, newMessageBody});

export default dialogsReducer;