








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