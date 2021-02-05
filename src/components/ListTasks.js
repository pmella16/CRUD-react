import React, { Fragment, useEffect }from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getTaskAction } from '../actions/taskActions';
import Task from './Task'
import FormAddTask from './FormAddTask';

export const ListTasks = () => {

    const loading = useSelector( state => state.task.loading );
    const error = useSelector( state => state.task.error );

    const dispatch = useDispatch();

    useEffect( () => {
        const loadTask = () => dispatch( getTaskAction() );
        loadTask();
    }, []);

    const tasks = useSelector( state => state.task.tasks);

    tasks.sort((a,b) => b.date - a.date);
    
    return ( 
        <Fragment>
            <FormAddTask />
        <h2 className="text-center my-5">Listado de Tareas</h2>


        <table className="table table-striped">
               <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">descripción</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Vigente</th>
                        <th scope="col">Acciones</th>
                    </tr>
               </thead>
               <tbody>
               {tasks.length === 0 ?
                <tr className="error-empty">
                    <th scope="col">No Hay tareas</th>
                </tr>
                :
                (
                       tasks.map(task => (<Task
                                key={task.id}
                                task={task}/>))
                )}
               </tbody>
           </table>


           { loading ? <p>Cargando...</p> : null }
                        
            { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                        
                       

        </Fragment>
     );
}
 
export default ListTasks;