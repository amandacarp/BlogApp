//ORM - object relational map: library that takes what schemea looks like and returns js functions that will do insert, gets, finds
import { Request } from 'express';

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


export interface IPayload{
	authorid: number,
	email: string,
	username: string
}


export interface ReqUser extends Request {
    author?: Author & IPayload;
}


