import moment from 'moment';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Blog } from '../../common/types';

export interface singleBlogProps extends RouteComponentProps<{ id: string }> { };


const EditBlog: React.FC<singleBlogProps> = ({ history, match: { params: { id } } }) => {
    const [blog, setSingleBlog] = useState<Blog>(null);

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

    const editBlog = () => {
        Swal.fire({
            title: `Save your edit?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                return await fetch(`/api/blogs/${id}`, {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title,
                        content
                    })
                })
                    .then(() => {
                        Swal.fire({
                            title: 'Edit Saved!',
                            text: `Your Chirp# ${blog?.id} has been edited.`,
                            icon: 'success',
                        })
                    }

                    )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Blog edit not saved',
                    'error'
                )
            }
        }).then(() => { history.push('/') })
            .catch(err => {
                Swal.fire({
                    title: `Error: Blog not edited`,
                    icon: 'error',
                    text: err,
                    timer: 1500
                })
                console.log(err)
            })
    }


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
                <input type="text" className="form-control" placeholder={blog?.title} onChange={event => setTitle(event.target.value)} />
            </div>
            <div className="form-group">
                <label id="label">Edit your blog</label>
                <textarea rows={30} className="form-control" placeholder={blog?.content} onChange={event => setContent(event.target.value)}></textarea>
            </div>
            <div className="d-flex justify-content-between">
            <button id="button" className="btn shadow" onClick={() => history.goBack()}> Go Back</button>
            <button id="button" className="btn shadow" onClick={() => deleteBlog()}> Delete Blog</button>
            <button id="button" className="btn shadow" onClick={() => editBlog()}> Save Edit</button>
            </div>
        </div>
        </>
    )
}

export default EditBlog;