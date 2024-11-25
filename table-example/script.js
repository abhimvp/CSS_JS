const spinner= document.getElementById('spinner')
const table = document.getElementById('data-table');
const tableBody = document.getElementById('table-body');
const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageNumber = document.getElementById('page-number');


let data = []

// fetch data from API - from https://randomuser.me/
async function fetchData() {
    spinner.style.display = 'flex'; // show spinner
    // table.style.display = 'none'; // hide table
    // pagination.style.display = 'none'; // hide pagination
    // pageNumber.innerText = '1'; // reset page number
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('https://randomuser.me/api/?results=50');
        const jsonData = await response.json();
        data = jsonData.results;
        console.log(data) // grab the data we need from here
        displayTable(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        spinner.style.display = 'none'; // hide spinner
        table.style.display = 'table'; // show table
        pagination.style.display = 'block'; // show pagination
    }
}

// Display table data
function displayTable(dataToDisplay){
    tableBody.innerText = ''; // clear table body
    dataToDisplay.forEach(user => {
        const row = 
            `<tr>
                <td data-lable="Name">${user.name.first} ${user.name.last}</td>
                <td data-lable="Email">${user.email}</td>
                <td data-lable="Username">${user.login.username}</td>
                <td data-lable="Country">${user.location.country}</td>
            </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row)

    });

}

// startup
fetchData()


























// Dark mode functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// check if dark mode is enabled in local storage or is previous choosen
const isDarkMode = localStorage.getItem('dark-mode') === 'true';

// set initial theme based on local storage
if (isDarkMode) {
    body.classList.add('dark-mode');
    themeToggle.innerText = 'Light Mode';
}

// Toggle dark mode and update text
themeToggle.addEventListener('click', () => {
    body.style.transition = 'background-color 0.3s, color 0.3s';
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        themeToggle.innerText = 'Dark Mode';
        localStorage.setItem('dark-mode', 'false');
    } else {
        body.classList.add('dark-mode');
        themeToggle.innerText = 'Light Mode';
        localStorage.setItem('dark-mode', 'true');
    }
});