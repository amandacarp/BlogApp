import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiService, { setStorage } from '../../utils/api-service';

const Register = (props: RegisterProps) => {
    const history = useHistory<{ history: string }>()
    const [values, setValues] = useState<IFormState>({});

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };


    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!values.email || !values.first_name|| !values.last_name|| !values.password|| !values.username) {
            Swal.fire({
                title: `Error`,
                icon: 'error',
                text: 'Please fill out all the required fields',
            })
        } else {
        const token = await apiService('/auth/register', 'POST', values)
        setStorage(token)
        history.push('/blogs/profile')
        window.location.reload(true);
    }
    };


    return (
        <>

            <div className="container">
                <div className="row justify-content-center mt-3">
                    <div className="col-md-4">
                        <div className="card shadow">
                            <div className="card-body">
                                <h4 className="card-title text-center profile">Welcome! </h4>
                                <h4 className="card-title text-center profile">Please register below to get started!</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center m-4">
                    <div className="col-6">

                        <div className="form-group mt-4">
                            <label id="label">First Name</label>
                            <input type="text" className="form-control" name="first_name" value={values.first_name || ''} onChange={handleChanges} required/>
                        </div>

                        <div className="form-group mt-2">
                            <label id="label">Last Name</label>
                            <input type="text" className="form-control" name="last_name" value={values.last_name || ''} onChange={handleChanges} required/>
                        </div>

                        <div className="form-group mt-2">
                            <label id="label">Username</label>
                            <input type="text" className="form-control" name="username" value={values.username || ''} onChange={handleChanges} required/>
                        </div>

                        <div className="form-group mt-2">
                            <label id="label">Email Address</label>
                            <input type="text" className="form-control" name="email" value={values.email || ''} onChange={handleChanges} required/>
                        </div>

                        <div className="form-group mt-2">
                            <label id="label">Password</label>
                            <input type="password" className="form-control" name="password" value={values.password || ''} onChange={handleChanges} required/>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button id="button" type="button" className="btn shadow mt-2 mx-4" onClick={handleRegister} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-plus" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                    <path d="M16 11h6m-3 -3v6" />
                                </svg>
                            Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export interface IFormState {
    email?: string;
    password?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
}

interface RegisterProps { }

export default Register;