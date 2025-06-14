import { writable } from 'svelte/store';
import type { Resume } from '$lib/types/resume';

export const resume = writable<Resume | null>(null);

export async function loadResume(profileName: string = 'default') {
	try {
		const response = await fetch(`/profiles/${profileName}.json`);
		if (!response.ok) {
			throw new Error(`Failed to load resume: ${response.statusText}`);
		}
		const data = await response.json();
		resume.set(data);
	} catch (error) {
		console.error('Error loading resume:', error);
		resume.set(null);
	}
}
