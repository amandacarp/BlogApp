import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './scss/app';
import Blogs from './components/Blogs';
import SingleBlog from './components/SingleBlog';
import Navbar from './components/Navbar';
import EditBlog from './components/EditBlog';
import PostBlog from './components/PostBlog';

const App: React.FC = () => {
    return (
        <Router>
            <>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Blogs}/>
                <Route exact path='/:id' component={SingleBlog} />
                <Route exact path='/:id/edit' component={EditBlog} />
                <Route exact path='/blogs/post' component={PostBlog} />
            </Switch>
            </>
        </Router>
    )
}

export default App;
