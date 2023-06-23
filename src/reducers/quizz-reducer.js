const defaultState = {
    categories:[],
    category_test:[],
    current_test:0,
    correct_answers:[],
    incorrect_answers:[],
    current_category:1,
    answers:[],
    timer:0
}
 export const quizzReducer = (state=defaultState,action) => {
    switch (action.type) {
        case "LOAD_CATEGORIES":
            return {...state,categories:action.payload}
        case "LOAD_CATEGORY_TEST":
            return {...state,category_test:action.payload}
        case 'SET_CURRENT_TEST':
            return {...state,current_test:action.payload}
        case 'ADD_CORRECT_ANSWER':
            return {...state,correct_answers:[...state.correct_answers,action.payload]}
        case 'ADD_INCORRECT_ANSWER':
            return {...state,incorrect_answers:[...state.incorrect_answers,action.payload]}
        case 'ADD_ANSWER':
            return {...state,answers:[...state.answers,action.payload]}
        case 'ADD_CATEGORY':
            return {...state,current_category:action.payload}
        case 'CLEAR_TEST':
            return {...state,current_test:0,correct_answers:[],incorrect_answers:[],answers:[],category_test:[],current_category:1,timer:0}
        case 'SET_TIMER':
            return {...state,timer:action.payload}
        default:
            return state;
    }
}