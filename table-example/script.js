const spinner= document.getElementById('spinner')
const table = document.getElementById('data-table');
const tableBody = document.getElementById('table-body');
const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageNumber = document.getElementById('page-number');


let data = []
let currentPage = 1;
const rowsPerPage = 10;

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
        updatePaginationButtons();
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
    // we're going to call this everytime we change pages
    tableBody.innerText = ''; // clear table body
    const start = (currentPage-1)*rowsPerPage;
    const end = start + rowsPerPage;
    console.log('start',start,'end', end)
    const paginatedItems = dataToDisplay.slice(start, end);
    paginatedItems.forEach(user => {
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

// Previous Page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayTable(data);
        updatePaginationButtons();
    }
}

// next page
function nextPage() {
    if (currentPage * rowsPerPage < data.length) {
        currentPage++;
        displayTable(data);
        updatePaginationButtons();
    }
}

// update pagination buttons
function updatePaginationButtons() {
    pageNumber.innerText = currentPage;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * rowsPerPage >= data.length;
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