export function splitArrayBy(numOfItems, data) {
	const numOfArrays = Math.ceil(data.length / numOfItems);

	return new Array(numOfArrays).fill().map((_, index) => {
		const acc = index * numOfItems;
		return data.slice(acc, acc + numOfItems);
	});
}

export function sortArrayBy(array, options = {}) {
	return array.toSorted((a, b) => {
		const { sortingOrder, by: value } = options;
		let values = [a[value], b[value]];

		const isString = values.every((val) => isNaN(val));
		const isNumber = values.every((val) => typeof val === "number");

		values = sortingOrder === "ascending" ? values : values.reverse();
		if (isString) return sortByString(...values);
		if (isNumber) return sortByNumber(...values);
	});
}

function sortByString(val1, val2) {
	return val1.localeCompare(val2);
}

function sortByNumber(val1, val2) {
	return val1 - val2;
}

export const formatter = {
	date(input) {
		return new Intl.DateTimeFormat("sv-SE").format(new Date(input));
	},
	number(number, options = { format: "standard", lang: "de-DE" }) {
		const { format, lang } = options;
		/* @param {notation} [standard | compact] long vs short numbers */
		return new Intl.NumberFormat(lang, { notation: format }).format(number);
	},
	currency(number, options) {
		const defaultOptions = {
			currency: "EUR",
			format: "standard",
			lang: "de-DE",
			decimals: 0,
		};
		options = { ...defaultOptions, ...options };
		const { currency, format, lang, decimals } = options;

		return new Intl.NumberFormat(lang, {
			style: "currency",
			currency: currency,
			notation: format,
			maximumFractionDigits: decimals,
		}).format(number);
	},
};
