import * as React from 'react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { IBlog } from '../../../common/types';
import { useParams, useHistory } from 'react-router-dom'
import apiService from '../../utils/api-service';
import ReactTooltip from 'react-tooltip';



const EditBlog = (props: EditBlogProps) => {
    const [blog, setSingleBlog] = useState<IBlog>(null);

    const { id } = useParams<{ id: string }>()
    const history = useHistory<{ history: string }>()

    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)

    useEffect(() => {
        apiService(`/api/blogs/${id}`)
            .then(blog => setSingleBlog(blog[0]));
    }, [id])


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
                return await apiService(`/api/blogs/${id}`, 'PUT', { title, content })

                    .then(() => {
                        Swal.fire({
                            title: 'Edit Saved!',
                            text: `Your Blog #${blog?.id} has been edited.`,
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
        }).then(() => { history.push(`/blogs/profile`) })
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
                return await apiService(`/api/blogs/${id}`, 'DELETE')
                    .then(() => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: `Your Blog #${blog?.id} has been deleted.`,
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
        }).then(() => { history.push('/blogs/profile') })
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

    return (
        <>
        <ReactTooltip />

            <div className="container">
                <div className="form-group">
                    <label id="label">Edit your Title</label>
                    <input type="text" className="form-control" defaultValue={blog?.title} onChange={event => setTitle(event.target.value)} />
                </div>
                <div className="form-group">
                    <label id="label">Edit your blog</label>
                    <textarea rows={20} className="form-control" defaultValue={blog?.content} onChange={event => setContent(event.target.value)}></textarea>
                </div>
                <small className="d-block charcount">{blog?.content.length || 0} / 5,000</small>
                <div className="d-flex justify-content-between">
                    <button data-tip="Save Edit" id="button" className="btn shadow" onClick={() => editBlog()}> <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-floppy" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                        <circle cx="12" cy="14" r="2" />
                        <polyline points="14 4 14 8 8 8 8 4" />
                    </svg></button>
                    <button  data-tip="Delete Blog" id="button" className="btn shadow" onClick={() => deleteBlog()}> <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="4" y1="7" x2="20" y2="7" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg></button>
                    <button data-tip="Go Back" id="button" className="btn shadow" onClick={() => history.goBack()}> <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-back" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
                    </svg></button>
                </div>
            </div>
        </>
    )
}

interface EditBlogProps { }

export default EditBlog;