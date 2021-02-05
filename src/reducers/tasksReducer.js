import {
    ADD_TASK,
    ADD_TASK_SUCCESS,
    ADD_TASK_ERROR,
    START_GET_TASK,
    GET_TASK_SUCCESS,
    GET_TASK_ERROR,
    GET_TASK_DELETED,
    TASK_DELETED_SUCCESS,
    TASK_DELETED_ERROR,
    GET_TASK_EDITED,
    START_TASK_EDITED,
    TASK_EDITED_SUCCESS,
    TASK_EDITED_ERROR,
} from '../types';

const initialState = {
    tasks: [],
    error: false,
    loading: false,
    taskDelete: null,
    taskEdit: null,
}

export default function(state = initialState, action) {

    switch(action.type) {

        case ADD_TASK:
        case START_GET_TASK:
            return {
                ...state,
                loading: true
            }
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                tasks: [...state.tasks, action.payload]
            }
        case ADD_TASK_ERROR:
        case GET_TASK_ERROR:
        case TASK_DELETED_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }

        case GET_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                tasks: action.payload
            }
        case GET_TASK_DELETED:
            return {
                ...state,
                taskDelete: action.payload
            }
        case TASK_DELETED_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.filter( t => t.id !== state.taskDelete),
                taskDelete: null
            }

        case GET_TASK_EDITED:
            return {
                ...state,
                taskEdit: action.payload
            }
        case TASK_EDITED_SUCCESS:
            return {
                ...state,
                taskEdit: null,
                tasks: state.tasks.map( t => 
                    t.id === action.payload.id ? t = action.payload : t
                )
            }
        default:
            return state;
    }
}