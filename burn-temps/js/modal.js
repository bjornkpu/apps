import {fetchAndUpdateRecords} from "./app.js";

export function showModal(elementId) {
    document.getElementById(elementId).style.display = 'block';
}

// Function to close the modal
export function closeModal(elementId) {
    document.getElementById(elementId).style.display = 'none';
}

// Function to save the API key in local storage
export async function saveApiKey() {
    const apiKey = document.getElementById('apiKeyInput').value;
    if (apiKey) {
        localStorage.setItem('apiKey', apiKey);
        closeModal('apiKeyModal');
        await fetchAndUpdateRecords();
    } else {
        alert('Please enter a valid API key');
    }
}

// Check if the API key is already in local storage
window.onload = function() {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
        showModal('apiKeyModal');
    }
}

window.saveApiKey = saveApiKey
window.showModal = showModal
window.closeModal = closeModal
