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
export async function setBurnNumber(){
    const burnNumber = document.getElementById('burnNumberInput').value;
    if (burnNumber) {
        localStorage.setItem('burnNumber', burnNumber);
        document.getElementById('burnNumber').innerHTML = ` #${burnNumber}`;
        closeModal('burnNumberModal');
        await fetchAndUpdateRecords();
    } else {
        alert('Please enter a valid API key');
    }
}


window.saveApiKey = saveApiKey
window.setBurnNumber = setBurnNumber
window.showModal = showModal
window.closeModal = closeModal
