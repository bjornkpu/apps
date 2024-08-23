const API_BASE_URL = 'https://app.nocodb.com/api/v2';
const TABLE_ID = 'mizoub9u6ycblan';
const RECORDS_ENDPOINT = `/tables/${TABLE_ID}/records`;
const DEFAULT_LIMIT = 25;
const DEFAULT_SHUFFLE = 0;
const DEFAULT_OFFSET = 0;


export async function fetchAllRecords(apiKey, { limit = DEFAULT_LIMIT, shuffle = DEFAULT_SHUFFLE, offset = DEFAULT_OFFSET } = {}) {
    const url = new URL(API_BASE_URL + RECORDS_ENDPOINT);
    url.searchParams.append('limit', limit);
    url.searchParams.append('shuffle', shuffle);
    url.searchParams.append('offset', offset);

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'xc-token': apiKey
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error fetching records: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
