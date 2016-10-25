// SINGLETON
let instance = null;

console.log('devia ser primeiro');

const socket = io => {
	if (instance)
		return instance;

	const socket = io.sockets;

	let olar = () => {
		return {
			emit: socket.emit,
		}
	}

	instance = olar();
}


export default socket;

// class Sockets {

// 	constructor(io, a) {
// 		// console.log(a);
// 		console.log('devia ser segundo');
// 		if (!instance) {
// 			instance = this;
// 			this.socket = io.sockets;
// 		}

// 		return instance;
// 	}

// 	emit(namespace, data) {
// 		this.socket.emit(namespace, data);
// 	}

// 	on(namespace, cb) {
// 		return this.socket.on(namespace, cb);
// 	}

// }

// export default Sockets;