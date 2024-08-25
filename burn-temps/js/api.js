const API_BASE_URL = 'https://app.nocodb.com/api/v2';
const TABLE_ID = 'mizoub9u6ycblan';
const RECORDS_ENDPOINT = `/tables/${TABLE_ID}/records`;
const DEFAULT_LIMIT = 1000;
const DEFAULT_SHUFFLE = 0;
const DEFAULT_OFFSET = 0;


export async function fetchAllRecords({ limit = DEFAULT_LIMIT, shuffle = DEFAULT_SHUFFLE, offset = DEFAULT_OFFSET } = {}) {
    var burnNumber = localStorage.getItem('burnNumber')

    const url = new URL(API_BASE_URL + RECORDS_ENDPOINT);
    url.searchParams.append('limit', limit);
    url.searchParams.append('shuffle', shuffle);
    url.searchParams.append('offset', offset);
    url.searchParams.append('where', `where=(BurnNumber,eq,${burnNumber || 1})`);

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'xc-token': localStorage.getItem('apiKey')
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

export async function postRecord(record) {
    const url = new URL(API_BASE_URL + RECORDS_ENDPOINT);
    url.searchParams.append('limit', DEFAULT_LIMIT.toString());
    url.searchParams.append('shuffle', DEFAULT_SHUFFLE.toString());
    url.searchParams.append('offset', DEFAULT_OFFSET.toString());

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'xc-token': localStorage.getItem('apiKey'),
        },
        body: JSON.stringify(record)
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
