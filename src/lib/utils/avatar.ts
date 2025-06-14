export function getInitials(name: string): string {
	return name
		.split(' ')
		.map((part) => part[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
}

// Generate a random hex color
function getRandomColor(): string {
	return Math.floor(Math.random() * 16777215)
		.toString(16)
		.padStart(6, '0');
}

export function getAvatarUrl(name: string, title: string): string {
	// Use DiceBear's avatars API with a seed based on name
	const seed = encodeURIComponent(name);
	const style = title.toLowerCase().includes('manager') ? 'bottts' : 'pixel-art';
	const backgroundColor = getRandomColor();
	return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&backgroundColor=${backgroundColor}`;
}

export function getAvatarFallback(name: string, title: string): string {
	const initials = getInitials(name);
	const style = title.toLowerCase().includes('manager') ? 'bottts' : 'pixel-art';
	const backgroundColor = getRandomColor();
	return `https://api.dicebear.com/7.x/${style}/svg?seed=${initials}&backgroundColor=${backgroundColor}`;
}
