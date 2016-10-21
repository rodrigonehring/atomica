import request from 'supertest';
import app from '../src/app';

const user = (user) => {
	const user1 = request.agent(app);
	user1
	  .post('/api-v2/login')
	  .send({ email: 'admin@test.com', password: '123456' });

	return user1;
}

export default user;
