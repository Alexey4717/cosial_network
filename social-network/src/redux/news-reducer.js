import Dmitry from '../assets/images/dmitry.jpg';
import Andrey from '../assets/images/andrey.jpg';
import Alexey from '../assets/images/alexey.jpg';
import bali from '../assets/images/bali_post.jpg';
import IThumor from '../assets/images/IThumor_post.jpg';
import IThumor2 from '../assets/images/IThumor_post2.jpg';

let initialState = {
    newsPosts: [{id: "1", user: 'Dmitry', userPhoto: Dmitry, postImage: bali, postName: 'Relax-time', postBody: "Хочется закрыть глаза и проснуться в своем доме на Бали.", postTime: '11.03.2021 11:45', likesCount: "5"},
        {id: "2", user: 'Andrey', userPhoto: Andrey, postImage: IThumor, postName: 'ITumor | программисты шутят', postBody: "Жиза :(", postTime: '10.03.2021 18:35', likesCount: "10"},
        {id: "3", user: 'Alexey', userPhoto: Alexey, postImage: IThumor2, postName: 'ITumor | программисты шутят', postBody: "Да что ты знаешь о боли.", postTime: '09.03.2021 12:48', likesCount: "25"}],
}

const newsReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
}

export default newsReducer;