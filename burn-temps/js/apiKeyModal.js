import {fetchAndUpdateRecords} from "./app.js";

export function showApiKeyModal() {
    document.getElementById('apiKeyModal').style.display = 'block';
}

export function closeApiKeyModal() {
    document.getElementById('apiKeyModal').style.display = 'none';
}

export async function saveApiKey() {
    const apiKey = document.getElementById('apiKeyInput').value;
    if (apiKey) {
        localStorage.setItem('apiKey', apiKey);
        closeApiKeyModal();
        await fetchAndUpdateRecords();
    } else {
        alert('Please enter a valid API key');
    }
}

// Check if the API key is already in local storage
window.onload = function() {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
        showApiKeyModal();
    }
}

window.showApiKeyModal = showApiKeyModal
window.closeApiKeyModal = closeApiKeyModal
window.saveApiKey = saveApiKey
