export interface ValidationProps {
	value: string | number;
	isRequired?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
}

export function validate({
	value,
	isRequired,
	minLength,
	maxLength,
	min,
	max,
}: ValidationProps) {
	let isValid = true;

	if (isRequired) {
		isValid = isValid && value.toString().trim().length > 0;
	}

	if (minLength && minLength > 0 && typeof value === 'string') {
		isValid = isValid && value.length >= minLength;
	}

	if (maxLength && maxLength > 0 && typeof value === 'string') {
		isValid = isValid && value.length <= maxLength;
	}

	if (min && min > 0 && typeof value === 'number') {
		isValid = isValid && value >= min;
	}

	if (max && max > 0 && typeof value === 'number') {
		isValid = isValid && value <= max;
	}

	return isValid;
}
