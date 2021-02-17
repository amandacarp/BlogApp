import * as React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import apiService from '../../utils/api-service';

const Contact = (props: ContactProps) => {

    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const result = await apiService('/api/contact', "POST", ({ email, subject, content: body }));
        setEmail('');
        setSubject('');
        setBody('');
        Swal.fire({
            title: 'Sent!',
            text: `Your Email has been sent!`,
            icon: 'success',
        })
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center m-4">
                    <div className="col-md-4">
                        <div className="form-group mt-2">
                            <label id="label"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <polyline points="3 7 12 13 21 7" />
                            </svg>Email Address</label>
                            <input type="text" className="form-control" name="email" value={email} onChange={e => setEmail(e.target.value)} />

                            <label id="label"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-forms" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3" />
                                <path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3" />
                                <path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7" />
                                <path d="M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1" />
                                <path d="M17 12h.01" />
                                <path d="M13 12h.01" />
                            </svg>Subject</label>
                            <input type="text" className="form-control" name="password" value={subject} onChange={e => setSubject(e.target.value)} />

                            <label id="label"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-notebook" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
                                <line x1="13" y1="8" x2="15" y2="8" />
                                <line x1="13" y1="12" x2="15" y2="12" />
                            </svg>Body</label>
                            <textarea rows={10} className="form-control" value={body} onChange={e => setBody(e.target.value)} ></textarea>
                        </div>

                        <div className="d-flex justify-content-end">
                            <button onClick={handleSubmit} id="button" type="button" className="btn shadow mt-2 mx-4" ><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                                <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
                            </svg> Send Email</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

interface ContactProps { }

export default Contact;