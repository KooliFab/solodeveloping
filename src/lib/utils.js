import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function slugifyHeading(text) {
	return String(text || '')
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/['’`]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}
