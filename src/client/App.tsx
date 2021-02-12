import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

const App = (props: AppProps) => {
    return (
        <Router>
            <>
            <Navbar />
                <Switch>
                    <Route exact path='/' component={Blogs} />
                    <Route exact path='/blog/:id' component={SingleBlog} />
                    <Route exact path ='/blogs/search'> <Search /> </Route>
                    <PrivateRoute exact path='/:id/edit'> <EditBlog /> </PrivateRoute>
                    <Route exact path='/blogs/login' component={Login} />
                    <Route exact path='/blogs/register' component={Register} />
                    <PrivateRoute exact path='/blogs/post'> <PostBlog /> </PrivateRoute>
                    <PrivateRoute exact path='/blogs/profile'> <Profile /> </PrivateRoute>
                    <Route path="*" component={NotFound} />
                </Switch>
            </>
            
        </Router>
    )
}

interface AppProps { }

export default App;
