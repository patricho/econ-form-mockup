export const AVG = (...nums: number[]): number => {
	const sum = nums.reduce((a, b) => a + b, 0)
	const avg = sum / nums.length || 0
	return avg
}

export const SUM = (...nums: number[]): number => {
	const sum = nums.reduce((a, b) => a + b, 0)
	return sum
}
