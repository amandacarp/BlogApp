import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import apiService from '../../utils/api-service';

const PostBlog = (props: PostBlogProps) => {

    const history = useHistory<{ history: string }>()

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState(null);
    const [selectedTags, setSelectedTags] = useState(null);

    const postBlog = async () => {
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

    useEffect(() => {
        apiService('/api/tags')
            .then(tags => setTags(tags));
    }, [])

    return (
        <>
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
                <button id="button" type="button" className="btn shadow mt-2 mx-4" onClick={() => postBlog()}>Post your Blog</button>
                <button id="button" type="button" className="btn shadow mt-2 mx-4" onClick={() => history.goBack()}> Go Back</button>
            </div>
        </div>
</>
    )
}

interface PostBlogProps { }

export default PostBlog;