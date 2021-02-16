import * as React from 'react';
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import apiService from '../../utils/api-service';
import Swal from 'sweetalert2';

const Donate = (props: DonateProps) => {

    const stripe = useStripe(); // returns a reference to Stripe passed to the Elements provider
    const elements = useElements();  // hook used to safely pass the payment information collected by an Element to the Stripe API
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');

    const handleDonate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const cardElement = elements.getElement(CardElement); // we put the CardElement in a variable because we don't want to mess around with anything from stripe directly. Protects us against liability
        const { token, error } = await stripe.createToken(cardElement); // same as making a fetch request to their server without having to actually write it. We use their built in function to make the process much easier for us
         // createToken returns an object that has two properties. token and error. destructured from obj.token and obj.error
        await apiService('/api/donate', "POST", { amount, token })
        // we take the amount and the token from stripe and send it to our back end
        // shorthand for amount: amount and token: token
        setAmount('');
        setName('');
        cardElement.clear();
        Swal.fire({
            title: 'Thank you!',
            text: `Thank you for your donation!`,
            icon: 'success',
        })

    }

    return (
        <>


            <div className="container">
            <div className="row justify-content-center mt-3">
                    <div className="col-md-4">
                        <div className="card shadow">
                            <div className="card-body">
                                <h4 className="card-title text-center profile">I hope you are enjoying this website!</h4>
                                <h4 className="card-title text-center profile">Please consider donating below!</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-3">
                    <div className="col-md-4">
                        <div className="form-group mt-2">
                            <label id="label"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-forms" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3" />
                                <path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3" />
                                <path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7" />
                                <path d="M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1" />
                                <path d="M17 12h.01" />
                                <path d="M13 12h.01" />
                            </svg>  Name</label>
                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />

                            <label id="label" className="mt-2"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-coin" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="12" r="9" />
                                <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1 -1.8 -1" />
                                <path d="M12 6v2m0 8v2" />
                            </svg>  Amount</label>
                            <input type="text" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} />

                            <label className="mt-2" id="label"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-credit-card" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <rect x="3" y="5" width="18" height="14" rx="3" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                                <line x1="7" y1="15" x2="7.01" y2="15" />
                                <line x1="11" y1="15" x2="13" y2="15" />
                            </svg>  Credit Card Info</label>
                            <CardElement className="form-control" />

                            <div className="d-flex justify-content-end">
                                <button onClick={handleDonate} id="button" type="button" className="btn shadow mt-4 mx-4"> Donate Here!
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

interface DonateProps { }

export default Donate;


// how do we grab the info from the CardElement input they gave us safely? We don't want to touch the information directly
// when the button is clicked, it will grab what is in the input field no problem, as it is controlled by our amount state
// it will send the CardElement info to the stripe api, which will then tokenize(encrypt) it, and return the token to us
// we take the amount and the token together, and send them to our express server