<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>World Time</title>
</head>
<body>
    <div>
        <p id="date"></p>
        <p id="clock"></p>
    </div>
    <script>
        let lastTime = null;

        // Update the date
        function updateDate() {
            if (lastTime) {
                const year = lastTime.getFullYear();
                const month = lastTime.toLocaleString('default', { month: 'short' });
                const day = lastTime.getDate();

                // Format the date
                const dateString = `${day.toString().padStart(2, '0')}/${month}/${year}`;

                // Update the date element
                document.getElementById('date').textContent = dateString;
            }
        }

        async function updateTime() {
            try {
                // Fetch time data from the API
                const response = await fetch('https://api.api-ninjas.com/v1/worldtime?city=UTC', {
                    headers: { 'X-Api-Key': 'IqFWXtMcrzehyfH0YxCYjg==VBFfbPmaACUddPII' }
                });

                if (!response.ok) throw new Error('Failed to fetch time data');

                const data = await response.json();

                // Parse the datetime from the API
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

        function displayTime() {
            if (lastTime) {
                // Display the time in 12-hour format with AM/PM
                document.getElementById('clock').textContent = lastTime.toLocaleTimeString('en-US', { hour12: true });
            }
        }

        // Initialize the clock on page load
        window.onload = updateTime;
    </script>
</body>
</html>
