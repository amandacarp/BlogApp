import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

const PostBlog= (props: PostBlogProps) => {

    const history = useHistory<{ history: string}>()

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState(null);
    const [selectedTags, setSelectedTags] = useState(null);

    const postBlog = async () => {
        fetch('/api/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                content
            })
        })
            .then((res) => res.json())
            .then((sqlRes) => {
                const blogid = sqlRes.insertId
                const tagIDs = selectedTags.map((tag: { value: string; }) => tag.value)
                tagIDs.forEach((tagid: number) => {
                    fetch('/api/blogtags', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            blogid,
                            tagid
                        })
                    })
                })
            })
            .catch(err => {
                alert('Error: Could Not Post Blog');
                console.log(err)
            })
         .then(() => {history.push('/')})

    }

    const getTag = async () => {
        const r = await fetch('/api/tags')
        const tags = await r.json()
        setTags(tags)
    }

    useEffect(() => { getTag() }, [])

    return (

        <div className="container">
            <div className="form-group">
                <label id="label">Enter your Title</label>
                <input type="text" className="form-control" onChange={event => setTitle(event.target.value)} />
            </div>
            <div>
                <Select id="labelSelect" isMulti options={tags?.map((tag: { id: number; name: string; }) => {
                    return { value: tag.id, label: tag.name }
                })} onChange={(selectedOptions) => setSelectedTags(selectedOptions)}></Select>
            </div>
            <div className="form-group mt-2">
                <label id="label">Post your blog here</label>
                <textarea rows={20} className="form-control" onChange={event => setContent(event.target.value)}></textarea>
            </div>
            <div className="d-flex justify-content-around">
            <button id="button" type="button" className="btn shadow mt-2 mx-4" onClick={() => postBlog()}>Post your Blog</button>
            <button id="button" type="button" className="btn shadow mt-2 mx-4" onClick={() => history.goBack()}> Go Back</button>
        </div>
        </div>

    )
}

interface PostBlogProps {}

export default PostBlog;