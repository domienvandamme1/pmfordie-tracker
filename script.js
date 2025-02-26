document.addEventListener('DOMContentLoaded', function() {
    // Set the fixed "today's date" as February 25, 2025 (as per requirements)
    const fixedToday = new Date(2025, 1, 27); // Month is 0-indexed (1 = February)
    
    // Set the end date as December 31, 2025
    const endDate = new Date(2025, 11, 31); // Month is 0-indexed (11 = December)
    
    // Set the milestone date (February 27, 2025)
    const milestoneDate = new Date(2025, 1, 27);
    
    // Display the current date in the header
    const currentDateElement = document.getElementById('current-date');
    currentDateElement.textContent = formatDate(fixedToday);
    
    // Calculate and display stats
    calculateStats(fixedToday, endDate, milestoneDate);
    
    // Generate the calendar
    generateCalendar(fixedToday, endDate, milestoneDate);
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

// Function to calculate and display stats
function calculateStats(startDate, endDate, milestoneDate) {
    // Calculate the total number of days from milestone to end date
    const totalDays = Math.floor((endDate - milestoneDate) / (1000 * 60 * 60 * 24)) + 1;
    
    // Calculate days passed (days between start date and milestone date)
    const daysPassed = Math.floor((milestoneDate - startDate) / (1000 * 60 * 60 * 24));
    
    // Days remaining is from milestone to end
    const daysRemaining = totalDays;
    
    // Calculate sprint statistics (14 days per sprint)
    const totalSprints = Math.ceil(totalDays / 14);
    const sprintsPassed = Math.floor(daysPassed / 14);
    const sprintsRemaining = totalSprints;
    
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
function generateCalendar(startDate, endDate, milestoneDate) {
    const calendarContainer = document.getElementById('calendar-container');
    
    // Calculate the number of days between start and end dates
    const dayDifference = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    // Calculate the number of rows needed (14 days per row)
    const rowCount = Math.ceil(dayDifference / 14);
    
    let currentDate = new Date(startDate);
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
            const currentDateCopy = new Date(currentDate);
            
            // Add the appropriate class based on whether the day has passed
            // Days before Feb 27, 2025 are "past" (red)
            // Feb 27, 2025 and after are "upcoming" (green)
            if (currentDateCopy < milestoneDate) {
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
            currentDate.setDate(currentDate.getDate() + 1);
            dayCounter++;
        }
        
        // Add the row to the calendar container
        calendarContainer.appendChild(rowElement);
    }
} 