import { Query } from './index';

const all = () => Query(`SELECT * FROM Tags`);

export default {
	all
};
