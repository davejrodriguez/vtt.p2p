import { randomUUID, type UUID } from 'crypto';

class Game {
	uuid: UUID;
	name: string;

	constructor(name: string) {
		this.uuid = randomUUID();
		this.name = name;
	}
}

export { Game };
