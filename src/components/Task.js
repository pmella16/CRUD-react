import React from 'react';

import { useDispatch } from 'react-redux';
import { deleteTaskAction, getTaskEdit } from '../actions/taskActions';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const Task = ({ task }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const confirmDeleteTask = id => {

        Swal.fire({
            title: '¿Eliminar?',
            text: "Si borras esta tarea será definitico",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {

                dispatch( deleteTaskAction(id) );
            }
        });
    
    };

    const redirecToEdit = task => {
        dispatch( getTaskEdit(task) );
        history.push(`/tasks/edit/${task.id}`);
    }

    const formatDate = (date) => {
        const d = new Date(date);
        // https://www.w3schools.com/jsref/jsref_obj_date.asp
        return `${d.getDay()} / ${d.getMonth() + 1} / ${d.getFullYear()}`;
    }

    return (
     <tr>
         <td>{task.id}</td>
         <td>{task.description}</td>
         <td>{ formatDate(task.date)}</td>
         <td>{task.valid === '1' ? 'Vigente' : 'No vigente'}</td>
         <td className="acciones">
                <button
                    type="button"
                    onClick={ () => redirecToEdit(task) }
                    className="btn btn-primary mr-2">
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDeleteTask(task.id)}>
                    Eliminar
                </button>
            </td>
     </tr>
     );
}
 
export default Task;
