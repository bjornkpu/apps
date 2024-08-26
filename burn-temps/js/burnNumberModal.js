import {fetchAndUpdateRecords} from "./app";

window.showBurnNumberModal = showBurnNumberModal
window.closeBurnNumberModal = closeBurnNumberModal
window.setBurnNumber = setBurnNumber

export function showBurnNumberModal() {
    document.getElementById('burnNumberModal').style.display = 'block';
}

// Function to close the modal
export function closeBurnNumberModal() {
    document.getElementById('burnNumberModal').style.display = 'none';
}

export async function setBurnNumber(){
    const burnNumber = document.getElementById('burnNumberInput').value;
    if (burnNumber) {
        localStorage.setItem('burnNumber', burnNumber);
        document.getElementById('burnNumber').innerHTML = ` #${burnNumber}`;
        closeBurnNumberModal();
        await fetchAndUpdateRecords();
    } else {
        alert('Please enter a valid API key');
    }
}
