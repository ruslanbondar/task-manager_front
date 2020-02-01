import * as actionTypes from '../actions/actions';

const initialState = {
    test: [
        {
            name: 'Ruslan',
            age: 26,
            id: 1
        },
        {
            name: 'Boris',
            age: 26,
            id: 2
        }
    ]
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.TEST_ARR:
            console.log(test)
            return {
                ...state,
                test: state.test
            };

        default:
            return state;
    };
};

export default reducer;