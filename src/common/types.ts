//ORM - object relational map: library that takes what schemea looks like and returns js functions that will do insert, gets, finds

export interface MySQLResponse {
	fieldCount: number;
	affectedRows: number;
	insertId: number;
	serverStatus: number;
	warningCount: number;
	message: string;
	protocol41: boolean;
	changedRows: number;
}

export interface IBlog {
    id?: number;
	title?: string;
    content?: string;
    authorid?: Author["id"];
	_created?: Date;
}

export interface Author {
	id?: number;
	name?: string;
	email?: string;
	_created?: Date;
}

export interface BlogTags {
	tagname?: string;
	blogid?: number;
	tagid?: number;
}