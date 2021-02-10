import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiService, { setStorage } from '../../utils/api-service';
import { IFormState } from './Register';

const Login = (props: LoginProps) => {
    const history = useHistory<{ history: string }>()
    const [values, setValues] = useState<IFormState>({});

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setValues((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = await apiService('/auth/login', 'POST', values)
        setStorage(token)
        history.push('/blogs/profile')
        window.location.reload(true);

    };

    return (
        <>
        <div className="container">
            <div className="row justify-content-center mt-3">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h4 className="card-title text-center profile">Welcome! </h4>
                            <h4 className="card-title text-center profile">Please login below to get started!</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center m-4">
                <div className="col-6">
                    <div className="form-group mt-2">
                        <label id="label">Email Address</label>
                        <input type="text" className="form-control" name="email" value={values.email || ''} onChange={handleChanges} />
                    </div>

                    <div className="form-group mt-2">
                        <label id="label">Password</label>
                        <input type="password" className="form-control" name="password" value={values.password || ''} onChange={handleChanges} />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button id="button" type="button" className="btn shadow mt-2 mx-4" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}


interface LoginProps { }

export default Login;