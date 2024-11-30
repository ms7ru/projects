async function updateTime() {
    try {
        // Fetch time for Delhi
        const response = await fetch('https://api.api-ninjas.com/v1/worldtime?city=Delhi', {
            headers: { 'X-Api-Key': '2eEzI79cHATEpMoUB9xKwKW76R7DSPowWDAHC34l' } // Your API Key
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch time data: ${errorText}`);
        }

        const data = await response.json();

        console.log('API Response:', data); // Debugging: Check API response structure

        // Parse the datetime from the API response
        lastTime = new Date(data.datetime);

        // Update the date and clock immediately
        updateDate();
        displayTime();

        // Start a local clock that updates every second
        setInterval(() => {
            lastTime.setSeconds(lastTime.getSeconds() + 1);
            updateDate();
            displayTime();
        }, 1000);
    } catch (error) {
        console.error('Error fetching time:', error);
    }
}

function updateDate() {
    if (lastTime) {
        const year = lastTime.getFullYear();
        const month = lastTime.toLocaleString('default', { month: 'short' });
        const day = lastTime.getDate();

        const dateString = `${day.toString().padStart(2, '0')}/${month}/${year}`;
        document.getElementById('date').textContent = dateString;
    }
}

function displayTime() {
    if (lastTime) {
        document.getElementById('clock').textContent = lastTime.toLocaleTimeString('en-US', { hour12: true });
    }
}

// Initialize on page load
window.onload = updateTime;
