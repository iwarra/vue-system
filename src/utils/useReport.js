import { useFetch } from "./useFetch";

export function useReport() {
	return useFetch("report").then((reports) => {
		const { data } = reports;
		return data;
	});
}
