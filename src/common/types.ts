//ORM - object relational map: library that takes what schemea looks like and returns js functions that will do insert, gets, finds

export interface MySQLResponse {
	fieldCount?: number;
	affectedRows?: number;
	insertId?: number;
	serverStatus?: number;
	warningCount?: number;
	message?: string;
	protocol41?: boolean;
	changedRows?: number;
}

export interface IBlog {
	id?: number;
	title?: string;
	content?: string;
	authorid?: Author['id'];
	_created?: Date;
	username?: Author['username'];
	first_name?: Author['first_name'];
	last_name?: Author['last_name'];

}

export interface Author {
	id?: number;
	name?: string;
	email?: string;
	password?: string;
	username?: string;
	_created?: Date;
	first_name?: string;
	last_name?: string;
}

export interface BlogTags {
	map: any;
	tagname?: string;
	blogid?: number;
	tagid?: number;
}


export interface IPayload {
	authorid?: number, // the is the unique id of the authors in our database. We need the id to get to the token's payload
	email?: string,
	username?: string
}

export interface IProfileInfo {
	id?: number,
	first_name?: string,
	last_name?: string,
	username?: string,
	email?: string,
	_created?: Date
}

export interface IProfileBlogs {
	id?: number,
	title?: string,
	content?: string,
	authorid?: number,
	_created?: Date
}

// acts as psuedo documentation. Write the tables in the code so you don't have to jump back to database to remember table and column names
// we can add these to our queries for typescript support
// the properties are optional because we don't usually select all of them
// you can interface or type to describe them. interfaces can meld or union with other interfaces