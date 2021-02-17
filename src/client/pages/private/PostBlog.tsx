import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import apiService from '../../utils/api-service';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2';


const PostBlog = (props: PostBlogProps) => {

    const history = useHistory<{ history: string }>()

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState(null);
    const [selectedTags, setSelectedTags] = useState(null);

    const postBlog = async () => {
        if (!title || !content || !selectedTags) {
            Swal.fire({
                title: `Error`,
                icon: 'error',
                text: 'Please fill out all the required fields',
            })
        } else {
        await apiService('/api/blogs', 'POST', { title, content })
            .then((sqlRes) => {
                const blogid = sqlRes.insertId
                const tagIDs = selectedTags.map((tag: { value: string; }) => tag.value)
                tagIDs.forEach((tagid: number) => {
                    apiService('/api/blogtags', 'POST', { blogid, tagid })
                })
            })
            .catch(err => {
                alert('Error: Could Not Post Blog');
                console.log(err)
            })
            .then(() => { history.push('/') })
        }
    }

    useEffect(() => {
        apiService('/api/tags')
            .then(tags => setTags(tags));
    }, [])

    return (
        <>
        <ReactTooltip />

            <div className="container">
                <div className="form-group">
                    <label id="label">Enter your Title</label>
                    <input type="text" className="form-control" onChange={event => setTitle(event.target.value)} />
                </div>
                <div>
                    <label id="label">Choose your Blog Tags</label>
                    <Select id="labelSelect" isMulti options={tags?.map((tag: { id: number; name: string; }) => {
                        return { value: tag.id, label: tag.name }
                    })} onChange={(selectedOptions) => setSelectedTags(selectedOptions)}></Select>
                </div>
                <div className="form-group mt-2">
                    <label id="label">Post your blog here</label>
                    <textarea rows={20} className="form-control" onChange={event => setContent(event.target.value)}></textarea>
                </div>
                <small className="d-block charcount">{content?.length || 0} / 5,000</small>
                <div className="d-flex justify-content-around">
                    <button data-tip="Post Blog" id="button" type="button" className="btn shadow mt-2 mx-4" onClick={postBlog}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-plus" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                        <line x1="12" y1="11" x2="12" y2="17" />
                        <line x1="9" y1="14" x2="15" y2="14" />
                    </svg></button>
                    <button data-tip="Go Back" id="button" type="button" className="btn shadow mt-2 mx-4" onClick={() => history.goBack()}> <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-back" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
                    </svg></button>
                </div>
            </div>
        </>
    )
}

interface PostBlogProps { }

export default PostBlog;