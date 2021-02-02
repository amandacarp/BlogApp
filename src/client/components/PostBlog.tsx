import * as React from 'react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface postBlogProps extends RouteComponentProps{ };


const PostBlog: React.FC<postBlogProps> = ({history}) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const postBlog = async () => {
            await fetch ('/api/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                content
            })
        })
        .then(() => { history.push('/') })
            .catch(err => {
                alert('Error: Could Not Post Blog');
                console.log(err)
            })
    }

    return(

         <div className="container">
            <div className="form-group">
                <label id="label">Enter your Title</label>
                <input id="username" type="text" className="form-control" onChange={event => setTitle(event.target.value)} />
            </div>
            <div className="form-group">
                <label id="label">Post your blog here</label>
                <textarea rows={30} className="form-control" onChange={event => setContent(event.target.value)}></textarea>
            </div>
            <button id="button" type="button" className="btn mr-4" onClick={() => postBlog()}>Post your Blog</button>
            <button id="button" type="button" className="btn" onClick={() => history.goBack()}> Go Back</button>
        </div>
    
    )
}

export default PostBlog;