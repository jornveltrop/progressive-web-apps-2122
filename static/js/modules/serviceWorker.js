export function serviceWorker() {
    if ('serviceWorker' in navigator) {
        
        window.addEventListener('load', function() {
            navigator.serviceWorker
            .register('/js/service-worker.js')
            .then(function(registration) {
                console.log("Service Worker Registered", registration);
                return registration.update();
            })
            .catch(function(err) {
                console.log("Service Worker Failed to Register", err);
            })
        })
        
    }
}