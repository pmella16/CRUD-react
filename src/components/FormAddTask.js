import React, { useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
//actions
import { addNewTaskAction } from '../actions/taskActions';


export const FormAddTask = () => {

    //crear state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [valid, setValid] = useState('1');
    const [validation, setValidation] = useState(false);

    const loading = useSelector( state => state.task.loading );
    const error = useSelector( state => state.task.error );

    const dispatch = useDispatch();

    const addNewTask = task => {
        dispatch( addNewTaskAction(task) )
    }



    const submitNewTask = e => {
        e.preventDefault();

        if (description.trim() === '') {
            setValidation(true);
            return;
        }

        addNewTask( {
            description,
            valid,
            date : Date.now()
        });

        setDescription('');
        setValid(true);
    }

    const onChangeFormulario = e => {
        setValidation(false);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Tarea
                        </h2>

                        { validation ? <p className="alert alert-danger p2 mt-4 text-center">Los campos no pueden ser vacios</p> : null }

                        <form
                        onSubmit={submitNewTask}
                        onChange={onChangeFormulario}
                        >

                            <div className="form-group">
                                <label>Descripción de la Tarea</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Descripción de la Tarea"
                                    name="description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>


                            <div className="form-group">
                                <label>Vigencia de Tarea</label>

                                <select
                                value={valid}
                                className="form-control"
                                name="valid"
                                onChange={e => setValid(e.target.value)}>
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

export default FormAddTask;