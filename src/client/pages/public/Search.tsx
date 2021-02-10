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
		<main className="container">
			<section className="row justify-content-center mt-3">
				<div className="col-md-4">
					<form className="form-group">
						<input
							placeholder="search for blogs by title ..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className="form-control"
						/>
					</form>
				</div>
			</section>
			<section className="row justify-content-center mt-3">
				{blogs.map(blog => (
					<HomeCard key={blog.id} blog={blog} />
				))}
			</section>
		</main>
	);
};

interface SearchProps {
}

export default Search