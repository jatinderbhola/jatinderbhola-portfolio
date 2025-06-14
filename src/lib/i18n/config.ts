export const languages = {
	en: {
		name: 'English',
		nativeName: 'English',
		direction: 'ltr',
		dateFormat: 'MM/DD/YYYY',
		timeFormat: 'HH:mm'
	},
	zh: {
		name: 'Chinese',
		nativeName: '中文',
		direction: 'ltr',
		dateFormat: 'YYYY/MM/DD',
		timeFormat: 'HH:mm'
	},
	hi: {
		name: 'Hindi',
		nativeName: 'हिन्दी',
		direction: 'ltr',
		dateFormat: 'DD/MM/YYYY',
		timeFormat: 'HH:mm'
	},
	fr: {
		name: 'French',
		nativeName: 'Français',
		direction: 'ltr',
		dateFormat: 'DD/MM/YYYY',
		timeFormat: 'HH:mm'
	},
	es: {
		name: 'Spanish',
		nativeName: 'Español',
		direction: 'ltr',
		dateFormat: 'DD/MM/YYYY',
		timeFormat: 'HH:mm'
	}
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'en';

export const fallbackLanguage: Language = 'en';

// Language-specific metadata
export const languageMetadata = {
	en: {
		name: 'English',
		nativeName: 'English',
		direction: 'ltr',
		dateFormat: 'MM/DD/YYYY',
		timeFormat: 'hh:mm A'
	},
	zh: {
		name: 'Chinese',
		nativeName: '中文',
		direction: 'ltr',
		dateFormat: 'YYYY/MM/DD',
		timeFormat: 'HH:mm'
	},
	hi: {
		name: 'Hindi',
		nativeName: 'हिन्दी',
		direction: 'ltr',
		dateFormat: 'DD/MM/YYYY',
		timeFormat: 'HH:mm'
	},
	fr: {
		name: 'French',
		nativeName: 'Français',
		direction: 'ltr',
		dateFormat: 'DD/MM/YYYY',
		timeFormat: 'HH:mm'
	},
	es: {
		name: 'Spanish',
		nativeName: 'Español',
		direction: 'ltr',
		dateFormat: 'DD/MM/YYYY',
		timeFormat: 'HH:mm'
	}
} as const;
