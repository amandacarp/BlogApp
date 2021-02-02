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

export interface BlogsTable {
    id?: string;
	title?: string
    content?: string;
    authorid?: string;
	_created?: Date;
}