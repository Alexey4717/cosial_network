import Kalimba from '../assets/music/Kalimba.mp3';
import MaidWithTheFlaxenHair from '../assets/music/Maid with the Flaxen Hair.mp3';
import SleepAway from '../assets/music/Sleep Away.mp3';

let initialState = {
    music: [{srcMusic: Kalimba, musicName: 'Kalimba'},
        {srcMusic: MaidWithTheFlaxenHair, musicName: 'Maid with the Flaxen Hair'},
        {srcMusic: SleepAway, musicName: 'Sleep Away'}]

}

const musicReducer = (state = initialState, action) => {
    switch (action.type) {
        
        default:
            return state;
    }
}

export default musicReducer;