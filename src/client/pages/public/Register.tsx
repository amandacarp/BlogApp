import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiService, { setStorage } from '../../utils/api-service';

const Register = (props: RegisterProps) => {
    const history = useHistory<{ history: string}>()
    const [values, setValues] = useState<IFormState>({});

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };


    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = await apiService('/auth/register', 'POST', values)
        setStorage(token)
        history.push('/blogs/profile')
    };
   

    return (
        <div className="container">
            <div className="form-group">
                <label id="label">First Name</label>
                <input type="text" className="form-control" name="first_name" value={values.first_name || ''} onChange={handleChanges} />
            </div>

            <div className="form-group mt-2">
                <label id="label">Last Name</label>
                <input type="text" className="form-control" name="last_name" value={values.last_name || ''} onChange={handleChanges} />
            </div>

            <div className="form-group mt-2">
                <label id="label">Username</label>
                <input type="text" className="form-control" name="username" value={values.username || ''} onChange={handleChanges} />
            </div>

            <div className="form-group mt-2">
                <label id="label">Email Address</label>
                <input type="text" className="form-control" name="email" value={values.email || ''} onChange={handleChanges} />
            </div>

            <div className="form-group mt-2">
                <label id="label">Password</label>
                <input type="text" className="form-control" name="password" value={values.password || ''} onChange={handleChanges} />
            </div>
            <div className="d-flex justify-content-end">
                <button id="button" type="button" className="btn shadow mt-2 mx-4" onClick={handleRegister} >Register</button>
            </div>
        </div>
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