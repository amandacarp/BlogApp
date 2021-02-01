import moment from 'moment';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IBlog } from './Blogs'
import Swal from 'sweetalert2'

export interface singleBlogProps extends RouteComponentProps<{ id: string }> { };


const EditBlog: React.FC<singleBlogProps> = ({ history, match: { params: { id } } }) => {
    const [blog, setSingleBlog] = useState<IBlog>(null);

    const getSingleBlog = async () => {
        const r = await fetch (`/api/blogs/${id}`);
        const singleBlog = await r.json();
        setSingleBlog(singleBlog[0]);
    };

    useEffect(() => {
        getSingleBlog();
    }, [id])

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const deleteBlog = () => {
        Swal.fire({
            title: `Are you sure you want to delete your blog?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                return await fetch(`/api/blogs/${id}`, {
                    method: 'delete'
                })
                    .then(() => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: `Your Blog# ${blog?.id} has been deleted.`,
                            icon: 'success',
                        })
                    }

                    )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Blog not deleted',
                    'error'
                )
            }
        }).then(() => { history.push('/') })
            .catch(err => {
                Swal.fire({
                    title: `Error: Blog not deleted`,
                    icon: 'error',
                    text: err,
                    timer: 1500
                })
                console.log(err)
            })
    }

    return(
        <>
        <div className="container">
            <div className="form-group">
                <label id="label">Edit your Title</label>
                <input type="text" className="form-control" value={blog?.title} onChange={event => setTitle(event.target.value)} />
            </div>
            <div className="form-group">
                <label id="label">Edit your blog</label>
                <textarea rows={30} className="form-control" value={blog?.content} onChange={event => setContent(event.target.value)}></textarea>
            </div>
            <button id="button" className="btn shadow" onClick={() => history.goBack()}> Go Back</button>
            <button id="button" className="btn shadow" onClick={() => deleteBlog()}> Go Back</button>
        </div>
        </>
    )
}

export default EditBlog;