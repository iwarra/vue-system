import { useLoadingStore } from "../stores/loading";

export async function fetchData(endpoint, dataHolder) {
  const loadingStore = useLoadingStore();
  loadingStore.setLoading(true);

  try {
    console.log('Fetching...')
    const BASE_URL = "https://startdeliver-mock-api.glitch.me/";
    const response = await fetch(BASE_URL + endpoint);
    const responseData = await response.json();
    dataHolder.length = 0;

    endpoint === "customer" ? dataHolder.push(...responseData) : dataHolder.push(...responseData.data);
    
    console.log('Fetched data:', dataHolder)
  } catch (error) {
    console.log(`Error fetching ${endpoint} data:`, error);
  } finally {
    loadingStore.setLoading(false); // Set loading to false after fetching data
  }
}