document.addEventListener('DOMContentLoaded', function() {
    // Set the start date as January 13, 2025
    const startDate = new Date(2025, 0, 13); // Month is 0-indexed (0 = January)
    
    // Set the fixed "today's date" as January 27, 2025
    const fixedToday = new Date(2025, 0, 27); // Month is 0-indexed (0 = January)
    
    // Set the end date as December 31, 2025
    const endDate = new Date(2025, 11, 31); // Month is 0-indexed (11 = December)
    
    // Display the current date in the header
    const currentDateElement = document.getElementById('current-date');
    currentDateElement.textContent = formatDate(fixedToday);
    
    // Calculate and display stats
    calculateStats(startDate, endDate, fixedToday);
    
    // Generate the calendar
    generateCalendar(startDate, endDate, fixedToday);
});

// Function to format date as "Month Day, Year"
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to format date as "Mon DD" or "Mon" depending on available space
function formatDayBox(date) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    return {
        dayNumber: day,
        monthYear: `${month} ${year}`
    };
}

// Function to check if two dates are the same day
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

// Function to calculate and display stats
function calculateStats(startDate, endDate, currentDate) {
    // Calculate the total number of days from start to end date
    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    // Calculate days passed (days between start date and current date)
    const daysPassed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    
    // Days remaining is from current date to end date
    const daysRemaining = Math.floor((endDate - currentDate) / (1000 * 60 * 60 * 24)) + 1;
    
    // Calculate sprint statistics (14 days per sprint)
    const totalSprints = Math.ceil(totalDays / 14);
    const sprintsPassed = Math.floor(daysPassed / 14);
    const sprintsRemaining = Math.ceil(daysRemaining / 14);
    
    // Update the stats in the DOM
    document.getElementById('total-days').textContent = totalDays;
    document.getElementById('days-passed').textContent = daysPassed;
    document.getElementById('days-remaining').textContent = daysRemaining;
    
    // Update sprint stats in the DOM
    document.getElementById('total-sprints').textContent = totalSprints;
    document.getElementById('sprints-passed').textContent = sprintsPassed;
    document.getElementById('sprints-remaining').textContent = sprintsRemaining;
}

// Function to generate the calendar
function generateCalendar(startDate, endDate, currentDate) {
    const calendarContainer = document.getElementById('calendar-container');
    calendarContainer.innerHTML = ''; // Clear any existing content
    
    // Calculate the number of days between start and end dates
    const dayDifference = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    // Calculate the number of rows needed (14 days per row)
    const rowCount = Math.ceil(dayDifference / 14);
    
    let dateIterator = new Date(startDate);
    let dayCounter = 0;
    
    // Create rows
    for (let i = 0; i < rowCount; i++) {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        
        // Create 14 day boxes per row (or fewer for the last row)
        for (let j = 0; j < 14 && dayCounter < dayDifference; j++) {
            const dayBox = document.createElement('div');
            dayBox.className = 'day-box';
            
            // Get the current date being processed
            const currentDateCopy = new Date(dateIterator);
            
            // Add the appropriate class based on the date
            if (isSameDay(currentDateCopy, currentDate)) {
                dayBox.classList.add('current');
            } else if (currentDateCopy < currentDate) {
                dayBox.classList.add('past');
            } else {
                dayBox.classList.add('upcoming');
            }
            
            // Format the date for display
            const formattedDate = formatDayBox(currentDateCopy);
            
            // Create elements for day number and month/year
            const dayNumberElement = document.createElement('div');
            dayNumberElement.className = 'day-number';
            dayNumberElement.textContent = formattedDate.dayNumber;
            
            const monthYearElement = document.createElement('div');
            monthYearElement.className = 'month-year';
            monthYearElement.textContent = formattedDate.monthYear;
            
            // Add the elements to the day box
            dayBox.appendChild(dayNumberElement);
            dayBox.appendChild(monthYearElement);
            
            // Add the day box to the row
            rowElement.appendChild(dayBox);
            
            // Move to the next day
            dateIterator.setDate(dateIterator.getDate() + 1);
            dayCounter++;
        }
        
        // Add the row to the calendar container
        calendarContainer.appendChild(rowElement);
    }
} 