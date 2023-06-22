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

export function className(...classes: any[]): string {
	return classes.filter(Boolean).join(' ');
}

export function convertUnixTimestamp(timestamp: string): string {
	const date = new Date(timestamp * 1000); // Convert to milliseconds

	// Options for formatting the date string
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZone: 'UTC'
	};

	// Format the date string using the UTC timezone
	const dateString = new Intl.DateTimeFormat('en-US', options).format(date);

	return dateString;
}
