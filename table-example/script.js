const spinner= document.getElementById('spinner')
const table = document.getElementById('data-table');
const tableBody = document.getElementById('table-body');
const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageNumber = document.getElementById('page-number');


let data = []
let sortedData = [];
let currentPage = 1;
const rowsPerPage = 10;
let sortDirection = {};
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
        // console.log(data) // grab the data we need from here
        sortedData = [...data];
        displayTable(sortedData)
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

// Sort table by column index
function sortTable(columnIndex){
    clearSortIcons();
    if(!sortDirection[columnIndex]){
        sortDirection[columnIndex] = 'asc';
    }
    console.log(columnIndex)
    sortedData = [...data].sort((a, b) => {
        let valA,valB;
        switch (columnIndex) {
            case 0:
                valA = `${a.name.first} ${a.name.last}`;
                valB = `${b.name.first} ${b.name.last}`;
                break;
            case 1:
                valA = a.email;
                valB = b.email;
                break;
            case 2:
                valA = a.login.username;
                valB = b.login.username;
                break;
            case 3:
                valA = a.location.country;
                valB = b.location.country;
                break;
            default:
                break;
        }
        if (sortDirection[columnIndex] === 'asc') {
            return valA.localeCompare(valB);
        } else {
            return valB.localeCompare(valA);
        }
    });
    sortDirection[columnIndex] = sortDirection[columnIndex] === 'asc'?'desc':'asc';
    // console.log(sortDirection)
    updateSortIcon(columnIndex,sortDirection[columnIndex]);
    displayTable(sortedData)
}

// clear sort icons for all columns
function clearSortIcons() {
    for ( let i=0;i<4;i++){
        const icon = document.getElementById(`icon-${i}`);
        icon.className = 'fas fa-sort';
    }
}

// Update the sort icon based on sort direction
function updateSortIcon(columnIndex, direction) {
    const icon = document.getElementById(`icon-${columnIndex}`);
    icon.className = direction === 'asc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
}

// Previous Page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayTable(sortedData);
        updatePaginationButtons();
    }
}

// next page
function nextPage() {
    if (currentPage * rowsPerPage < data.length) {
        currentPage++;
        displayTable(sortedData);
        updatePaginationButtons();
    }
}

// update pagination buttons
function updatePaginationButtons() {
    pageNumber.innerText = currentPage;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * rowsPerPage >= sortedData.length;
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