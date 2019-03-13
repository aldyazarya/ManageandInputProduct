
import {combineReducers} from 'redux' ;

// const replaceMe = () => {
//     return 0
// }

const init = {
    id : '',
    username: '',
    error: '',
    success: ''
}

const AuthReducer = (state = init, action) => {
    switch (action.type) {
        case 'Berhasil Login':
            return {...state, id: action.payload.id, username: action.payload.username}

        case 'ERROR':
            return {...state, error: action.payload, success:''}
        


        case 'SUCCESS':
            return{...state, error: '', success: action.payload}
            
        case 'Logout_User':
            return(state=init)


        case "SET_TIMEOUT":
            return{...state, error: '', success: ''}
    
        default:
           return state
    }
}

// const init2 = {
//     id:'',
//     username: '',
//     email: ''
// }

// const test = (state = init2, action) => {
//     switch (action.type) {
//         case 'berhasil logout':
//             return {...state, id:action.payload.id, username: action.payload.username, email: action.payload.email}


//         default:
//             return state
//     }
// }

export default combineReducers(
    {
        auth: AuthReducer
    }
)