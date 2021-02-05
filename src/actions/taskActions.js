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

import clientAxios from '../config/axios';
import Swal from 'sweetalert2';

export function addNewTaskAction(task) {
    return async (dispatch) => {
       // console.log(task);
        dispatch( addTask() );

        try {
            const newTask = await clientAxios.post('/tasks', task);

            console.log(newTask);
            dispatch( addTaskSuccess(newTask.data) );

            Swal.fire(
                'Éxito', 
                'La tarea se agregó de forma exitosa',
                'success'
            );

        } catch (error) {

            dispatch( addTaskError(error) );

            Swal.fire({
                icon: 'error',
                title: 'Ooops',
                text: 'Tenemos un error, intenta nuevamente'
            })
        }
    }
}

const addTask = () => ({
    type: ADD_TASK
});

const addTaskSuccess = (task) => ({
    type: ADD_TASK_SUCCESS,
    payload: task
});

const addTaskError = (error) => ({
    type: ADD_TASK_ERROR,
    loading: false,
    error: true
});


// traer tareas 

export function getTaskAction() {
    return async (dispatch) => {
        dispatch( getTask() );

        try {
            const resp = await clientAxios.get('/tasks');
            console.log(resp);
            dispatch( getTaskSuccess(resp.data) );

        } catch (error) {
            dispatch( getTaskError(error) );
        }
    }
}

const getTask = () => ({
    type: START_GET_TASK
})

const getTaskSuccess = resp => ({
    type: GET_TASK_SUCCESS,
    loading: false,
    error: null,
    payload: resp
});
const getTaskError = error => ({
    type: GET_TASK_ERROR,
    loading: false,
    error: true
});

// traer tareas 


// borrar tareas 

export function deleteTaskAction(id) {
    return async (dispatch) => {
        dispatch( getTaskDelete(id) );

        try {
            await clientAxios.delete(`/tasks/${id}`);
            dispatch(deletedTaskSuccess());
            Swal.fire(
                'Eliminada',
                'Tarea Eliminada correctamente',
                'success'
            )
            
        } catch (error) {
            console.log(error);
            dispatch(deletedTaskError());
        }
    }
}

const getTaskDelete = id => ({
    type: GET_TASK_DELETED,
    payload: id
});

const deletedTaskSuccess = () => ({
    type: TASK_DELETED_SUCCESS
});
const deletedTaskError = () => ({
    type: TASK_DELETED_ERROR
});

// borrar tareas 

// editar tareas
export function getTaskEdit(task) {
    return async (dispatch) => {
        dispatch( getTaskEditDelete(task) );
    }
}

const getTaskEditDelete = task => ({
    type: GET_TASK_EDITED,
    payload: task
});
// editar tareas

// editar put api

export function editTaskAction(task) {
    return async (dispatch) => {

        dispatch ( editTask(task) );

        try {
            await clientAxios.put(`/tasks/${task.id}`, task);

            dispatch ( editTaskSuccess(task) );
        } catch (error) {
            
        }
    }
}


const editTask = task => ({
    type: START_TASK_EDITED,
    payload: task
});

const editTaskSuccess = task => ({
    type: TASK_EDITED_SUCCESS,
    payload: task
});
const editTaskError = () => ({
    type: TASK_EDITED_ERROR
});
// editar put api