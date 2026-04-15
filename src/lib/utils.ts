import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Used for our errors, if error we did not explicitly throw using
// this is thrown, then we show generic error message
export class AppError extends Error {}

export const okResult = <T>(data: T, code: number = 200) => ({
	ok: true as const,
	data,
	code,
});

export const errResult = (error: string, code: number) => ({
	ok: false as const,
	error,
	code,
});
