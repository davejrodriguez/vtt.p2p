import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		game: {
			title: `Game ${params.gameId} Title`,
			description: `Game ${params.gameId} description.`
		}
	};
};
