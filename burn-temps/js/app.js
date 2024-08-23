import {fetchAllRecords, postRecord} from './api.js';
import { saveRecords, getAllRecords } from './indexedDB.js';

// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}

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
        await fetchAndUpdateRecords(apiKey);
    } else {
        alert('Please enter a valid API key');
    }
}

async function fetchAndUpdateRecords(apiKey) {
    try {
        const data = await fetchAllRecords(apiKey);
        await saveRecords(data.list);
        displayRecords(data.list);
    } catch (error) {
        console.error('Failed to fetch records', error.message);
    }
}

async function loadRecords() {
    try {
        const records = await getAllRecords();
        displayRecords(records);
    } catch (error) {
        console.error('Failed to load records from IndexedDB', error.message);
    }
}


// Function to display records in the DOM
function displayRecords(records) {
    const recordsTableBody = document.querySelector('#recordsTable tbody');
    recordsTableBody.innerHTML = ''; // Clear existing rows

    records.forEach(record => {
        const { formattedTime, shortDate } = formatISOToLocalTime(record.Time);
        const row = document.createElement('tr');
        row.innerHTML = `
           <td><span class="grey-text">${shortDate}</span><br>${formattedTime}</td>
            <td class="temp">${record.Temp1}</td>
            <td class="temp">${record.Temp2}</td>
            <td class="temp">${record.Temp3}</td>
        `;
        recordsTableBody.appendChild(row);
    });
}
function formatISOToLocalTime(isoString) {
    const date = new Date(isoString);
    // Extract hours and minutes
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    // Extract and format the date
    const shortDate = date.toLocaleDateString(undefined, {
        // year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return { formattedTime, shortDate };
}

// Check if the API key is already in local storage
window.onload = function() {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
        showModal();
    }
}

function changeValue(element,amount) {
    const input = document.getElementById(element);
    let currentVal = parseInt(input.value);
    const min = parseInt(input.min);
    const max = parseInt(input.max);

    let newVal = currentVal + amount;
    if (newVal >= min && newVal <= max) {
        input.value = newVal;
    }
}

async function fetchRecords() {
    const apiKey = localStorage.getItem('apiKey');
    const refreshIcon = document.getElementById('refreshIcon');

    if (apiKey) {
        refreshIcon.disabled = true;
        try {
            await fetchAndUpdateRecords(apiKey);
        } catch (error) {
            console.error('Error fetching records:', error);
        } finally {
            refreshIcon.disabled = false;
        }
    } else {
        alert('No API key saved. Please enter and save an API key first.');
    }
}

function getCurrentISOTime() {
    const date = new Date();
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const pad = num => num.toString().padStart(2, '0');
    const timezoneOffset = `${sign}${pad(Math.floor(Math.abs(offset) / 60))}:${pad(Math.abs(offset) % 60)}`;

    // Construct the date string in the required format
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${timezoneOffset}`;
}

async function track(){
    if (localStorage.getItem('apiKey')) {
        const currentTime = getCurrentISOTime(); // Example: '2024-08-23 15:40:00+0200'
        const temp1Input = parseFloat(document.getElementById('temp1').value);
        const temp2Input = parseFloat(document.getElementById('temp2').value);
        const temp3Input = parseFloat(document.getElementById('temp3').value);

        const newRecord = {
            Time: currentTime,
            Temp1: temp1Input,
            Temp2: temp2Input,
            Temp3: temp3Input
        };

        const response = await postRecord(newRecord)
        addRecordToTable(newRecord)
    } else {
        alert('No API key saved. Please enter and save an API key first.');
    }
}

function addRecordToTable(record) {
    const recordsTableBody = document.querySelector('#recordsTable tbody');
    const { formattedTime, shortDate } = formatISOToLocalTime(record.Time);
    const row = document.createElement('tr');
    row.innerHTML = `
    <td><span class="grey-text">${shortDate}</span><br>${formattedTime}</td>
    <td class="temp">${record.Temp1}</td>
    <td class="temp">${record.Temp2}</td>
    <td class="temp">${record.Temp3}</td>
  `;
    recordsTableBody.appendChild(row);
}

window.changeValue = changeValue
window.saveApiKey = saveApiKey
window.fetchRecords = fetchRecords
window.track = track

// Load records on page load
document.addEventListener('DOMContentLoaded', () => {
    loadRecords();
});
