import * as React from 'react';

const NotFound = (props: NotFoundProps) => {
	return (
		<main className="container">
			<section className="row mt-3">
				<div className="col-md-12">
					<h1 className="text-light text-center">404 PAGE NOT FOUND</h1>
				</div>
			</section>
		</main>
	);
};

interface NotFoundProps {}

export default NotFound;