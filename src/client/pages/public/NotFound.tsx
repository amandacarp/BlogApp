import * as React from 'react';

const NotFound = (props: NotFoundProps) => {
	return (
		<>
		<div id="background"></div>
		<div className="top">
			<h1 className="ghosth1">404</h1>
			<h3 className="ghosth3">page not found</h3>
		</div>
		<div className="ghostcontainer">
			<div className="ghost-copy">
				<div className="one"></div>
				<div className="two"></div>
				<div className="three"></div>
				<div className="four"></div>
			</div>
			<div className="ghost">
				<div className="face">
					<div className="eye"></div>
					<div className="eye-right"></div>
					<div className="mouth"></div>
				</div>
			</div>
			<div className="ghostshadow"></div>
		</div>
		<div className="bottom">
			<p className="ghosttext">Boo, looks like a ghost stole this page!</p>
		</div>
		</>
	);
};

interface NotFoundProps {}

export default NotFound;