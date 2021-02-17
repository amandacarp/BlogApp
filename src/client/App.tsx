import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import './scss/app';

import Blogs from './pages/public/Blogs';
import SingleBlog from './pages/public/SingleBlog';
import EditBlog from './pages/private/EditBlog';
import PostBlog from './pages/private/PostBlog';
import NotFound from './pages/public/NotFound';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Profile from './pages/private/Profile';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Search from './pages/public/Search';
import Donate from './pages/public/Donate';
import Contact from './pages/public/Contact';
import Footer from './components/Footer';
import { Elements } from '@stripe/react-stripe-js';
import MobileNavbar from './components/MobileNavbar';


const stripePromise = loadStripe('pk_test_51IK8ieDwWul8thRF43Y5ZoDk3jdeMYU4Ru233rwMYoGuvaxW8Fnkky2AR3YPzgthUolyuKJsXZQzLUTssv4730rh00b0RHKTm3');

const App = (props: AppProps) => {

    const [width, setWidth] = React.useState<number>(window.innerWidth);
    const breakpoint = 576;

    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);


    return (
        <Router>
            <>
                { width < breakpoint ? <MobileNavbar /> : <Navbar />}                
                <Switch>
                    <Route exact path='/' component={Blogs} />
                    <Route exact path='/blog/:id' component={SingleBlog} />
                    <Route exact path='/blogs/search'> <Search /> </Route>
                    <PrivateRoute exact path='/:id/edit'> <EditBlog /> </PrivateRoute>
                    <Route exact path='/blogs/login' component={Login} />
                    <Route exact path='/blogs/register' component={Register} />

                    <Route exact path='/blogs/donate'>
                        <Elements stripe={stripePromise}>
                            <Donate />
                        </Elements>
                    </Route>

                    <PrivateRoute exact path='/blogs/post'> <PostBlog /> </PrivateRoute>
                    <PrivateRoute exact path='/blogs/profile'> <Profile /> </PrivateRoute>
                    <Route exact path='/blogs/contact'> <Contact /> </Route>
                    <Route path="*" component={NotFound} />
                </Switch>
                <Footer />
            </>

        </Router>
    )
}

interface AppProps { }

export default App;
