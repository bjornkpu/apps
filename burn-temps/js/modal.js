// Function to show the modal
function showModal() {
    document.getElementById('apiKeyModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('apiKeyModal').style.display = 'none';
}

// Function to save the API key in local storage
async function saveApiKey() {
    const apiKey = document.getElementById('apiKeyInput').value;
    if (apiKey) {
        localStorage.setItem('apiKey', apiKey);
        closeModal();
    } else {
        alert('Please enter a valid API key');
    }
}

// Check if the API key is already in local storage
window.onload = function() {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
        showModal();
    }
}

window.saveApiKey = saveApiKey
