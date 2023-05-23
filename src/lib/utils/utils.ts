export function convertISOTimestamp(date: string): string {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZone: 'UTC'
	};

	return new Date(date).toLocaleDateString(undefined, options);
}

export const clsx = (className: string) => {
	return className
		.split('\n')
		.map((c) => c.trim())
		.filter(Boolean)
		.join(' ');
};

export function formatNumericValue(price: any): string {
	return price.toFixed(2).toString();
}
