// SINGLETON - ES6 CLASS
let instance = null;
class Sockets {

	constructor(socket) {
		if (!instance) {
			instance = this;
			this.socket = socket;
		}

		return instance;
	}

	emit(namespace, data) {
		this.socket.emit(namespace, data);
	}

	on() {
		return this.socket.on
	}

}

export default Sockets;