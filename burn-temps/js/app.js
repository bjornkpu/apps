
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

window.changeValue = changeValue
