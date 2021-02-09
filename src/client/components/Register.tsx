import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register = (props: RegisterProps) => {

    const history = useHistory<{ history: string }>()
    const [values, setValues] = useState<IFormState>(null);

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
		setValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
		
	};

    return (

        <div className="container">
            <div className="form-group">
                <label id="label">First Name</label>
                <input type="text" className="form-control" name="first_name" value={values.first_name || ''} onChange={handleChanges}/>
            </div>

            <div className="form-group mt-2">
                <label id="label">Last Name</label>
                <input type="text" className="form-control" name="last_name" value={values.last_name || ''} onChange={handleChanges}/>            </div>

            <div className="form-group mt-2">
                <label id="label">Username</label>
                <input type="text" className="form-control" name="username" value={values.username || ''} onChange={handleChanges}/>
            </div>

            <div className="form-group mt-2">
                <label id="label">Email Address</label>
                <input type="text" className="form-control" name="email" value={values.email || ''} onChange={handleChanges}/>
            </div>

            <div className="form-group mt-2">
                <label id="label">Password</label>
                <input type="text" className="form-control" name="password" value={values.password || ''} onChange={handleChanges}/>
            </div>
            <div className="d-flex justify-content-around">
                <button id="button" type="button" className="btn shadow mt-2 mx-4" onClick={handleRegister}>Register</button>
                <button id="button" type="button" className="btn shadow mt-2 mx-4" onClick={() => history.goBack()}> Go Back</button>
            </div>
        </div>

    )
}

interface IFormState {
    email?: string;
    password?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
}

interface RegisterProps { }

export default Register;