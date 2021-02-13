import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
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
        if (token) {
            setStorage(token)
            history.push('/blogs/profile')
        } else {
            Swal.fire({
                title: 'Invalid!',
                text: `Incorrect Email or Password. Please try again!`,
                icon: 'error',
            })
        } window.location.reload(true);
        //  look up history.listen

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
                            <label id="label"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <polyline points="3 7 12 13 21 7" />
                            </svg></label>
                            <input placeholder="Enter your Email Address" type="text" className="form-control" name="email" value={values.email || ''} onChange={handleChanges} />
                        </div>

                        <div className="form-group mt-2">
                            <label id="label"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-key" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="8" cy="15" r="4" />
                                <line x1="10.85" y1="12.15" x2="19" y2="4" />
                                <line x1="18" y1="5" x2="20" y2="7" />
                                <line x1="15" y1="8" x2="17" y2="10" />
                            </svg></label>
                            <input placeholder="Enter your Password" type="password" className="form-control" name="password" value={values.password || ''} onChange={handleChanges} />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button id="button" type="button" className="btn shadow mt-2 mx-4" onClick={handleLogin}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-login" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                            </svg> Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


interface LoginProps { }

export default Login;