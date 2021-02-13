import * as React from 'react';
import { useState, useEffect } from 'react';
import { IBlog } from '../../../common/types';
import apiService from '../../utils/api-service';
import HomeCard from '../../components/HomeCard';

const Search = (props: SearchProps) => {
	const [blogs, setblogs] = useState<IBlog[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');

	useEffect(() => {
		apiService('/api/blogs').then(blogs => setblogs(blogs));
	}, []);

	useEffect(() => {
		if (!searchTerm.length) return;
		apiService(`/api/blogs/search?term=${searchTerm}`)
			.then(blogs => setblogs(blogs)); //query paramaters: store search values in url bar
	}, [searchTerm]);

	return (
		<>
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-4">
					<form className="form-group">
						<span className="d-flex">
						<input
							placeholder="search for blogs by title ..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className="form-control"
						/>
						<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<circle cx="10" cy="10" r="7" />
							<line x1="21" y1="21" x2="15" y2="15" />
						</svg>
						</span>	
					</form>
				</div>
				</div>
				</div>
			<section className="row  mt-3">
				{blogs.map(blog => (
					<HomeCard key={blog.id} blog={blog} />
				))}
			</section>
			</>
	);
};

interface SearchProps {
}

export default Search