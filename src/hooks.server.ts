import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Skip middleware for devtools requests
	if (event.url.pathname.startsWith('/.well-known/appspecific/')) {
		return new Response('Not Found', { status: 404 });
	}

	// Get language from URL or default to 'en'
	// During prerendering, searchParams might not be available, so we need to check
	let lang = 'en';
	try {
		lang = event.url.searchParams.get('lang') || 'en';
	} catch {
		// During prerendering, searchParams access might fail
		lang = 'en';
	}

	// Set the language in the request context
	event.locals.lang = lang;

	return resolve(event);
};
