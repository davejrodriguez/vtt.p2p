import { Dexie, type EntityTable } from 'dexie';

interface User {
	email: string;
	name: string;
	publicKey: string;
	privateKeyArmored: string;
	revocationCertificate: string;
	createdAt: Date;
}

interface Game {
	name: string;
	createdAt: Date;
}

const db = new Dexie('VTT.P2P') as Dexie & {
	users: EntityTable<User, 'email'>;
	games: EntityTable<Game, 'name'>;
};

db.version(1).stores({
	users: '++, &email, name, createdAt', // Primary key and indexed props
	games: '++, &name, createdAt' // Primary key and indexed props
});

export type { User, Game };
export { db };
