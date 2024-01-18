const BASE_URL = "https://startdeliver-mock-api.glitch.me";

export function useFetch(endpoint) {
	return fetch(`${BASE_URL}/${endpoint}`).then((res) => {
		if (!res.ok) throw new Error("fetch is not going well");
		return res.json();
	});
}
