import React, { useEffect, useState } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';

import { editTaskAction } from '../actions/taskActions';
import { useHistory } from 'react-router-dom';

const EditTask = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const loading = useSelector( state => state.task.loading );
    const error = useSelector( state => state.task.error );

    const [task, setTask] = useState({
        description: '',
        valid: null
    });

    const taskEdit = useSelector(state => state.task.taskEdit);

    useEffect( () => {
        setTask(taskEdit);
    }, [taskEdit]);


    const onChangeFormulario = e => {
        setTask({
            ...task,
            [e.target.name] : e.target.value
        })
    }

    console.log(task);
    const { description, valid} = task;

    const submitEditTask = e => {
        e.preventDefault();

        dispatch ( editTaskAction(task) );

        history.push('/');
    }

    return ( 
        <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center mb-4 font-weight-bold">
                        Editar Tarea
                    </h2>

                 

                    <form
                    onSubmit={submitEditTask}
                    >

                        <div className="form-group">
                            <label>Descripción de la Tarea</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Descripción de la Tarea"
                                name="description"
                                value={description}
                                onChange={onChangeFormulario}
                            />
                        </div>


                        <div className="form-group">
                            <label>Vigencia de Tarea</label>

                            <select
                            value={valid}
                            className="form-control"
                            name="valid"
                            onChange={onChangeFormulario}
                            >
                                    <option value={'1'}>Vigente</option>  
                                    <option value={'0'}>No Vigente</option>  
                            </select>
                        </div>

                        <button 
                            type="submit"
                            className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                        >Agregar</button>
                    </form>

                    { loading ? <p>Cargando...</p> : null }
                    
                    { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    
                
                </div>
            </div>
        </div>
    </div>
     );
}
 
export default EditTask;