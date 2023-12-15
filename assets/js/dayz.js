// Constants
const FETCHDATATIMEOUT = 3 * 60 * 1000; // 3 minutes

// Fetch DayZ server data
function fetchDayZ(dayzId) {
    fetch(`https://dayz-servers.org/api/?object=servers&element=detail&key=${dayzId}`)
        .then(response => response.json())
        .then(data => printDayZ(dayzId, data));
    setTimeout(() => fetchDayZ(dayzId), FETCHDATATIMEOUT);
}

// Display DayZ server information
function printDayZ(dayzId, data) {
    const dayzList = document.querySelector('#dayzList');

    // Remove existing row if it exists
    const existingRow = document.getElementById(`dayz-${dayzId}`);
    if (existingRow) {
        dayzList.removeChild(existingRow);
    }

    // Create a new table row
    const row = document.createElement('tr');
    row.id = `dayz-${dayzId}`;

    // Status cell
    const statusCell = document.createElement('td');
    statusCell.classList.add('text-center');
    const onlineDot = document.createElement('img');

    if (data.is_online === '1') {
        onlineDot.src = './assets/images/online.png';
        onlineDot.alt = 'Online';
    } else {
        onlineDot.src = './assets/images/offline.png';
        onlineDot.alt = 'Offline';
    }
    statusCell.appendChild(onlineDot);
    row.appendChild(statusCell);

    // Server name cell
    const serverNameCell = document.createElement('td');
    serverNameCell.classList.add('text-start', 'ps-4', 'server-name');

    const serverName = isMobileDisplay() ? 'ZLG DayZ' : (data.hostname.length > 30 ? data.name.substring(0, 37) + '...' : data.hostname);

    serverNameCell.textContent = serverName;
    row.appendChild(serverNameCell);

    // Version cell (hidden on mobile display)
    if (!isMobileDisplay()) {
        const versionCell = document.createElement('td');
        const version = data.version.replace(/[^\d.]/g, ''); // Remove non-digit characters
        versionCell.classList.add('vp-text');
        versionCell.textContent = version;
        row.appendChild(versionCell);
    }

    // Player count cell
    const playerCountCell = document.createElement('td');
    playerCountCell.textContent = `${data.players} / ${data.maxplayers}`;
    playerCountCell.classList.add('vp-text');
    row.appendChild(playerCountCell);

    // Vote button cell
    const voteCell = document.createElement('td');
    voteCell.classList.add('text-center');
    const voteButton = document.createElement('button');
    voteButton.classList.add('nk-btn', 'nk-btn-rounded', 'nk-btn-color-dark-3', 'nk-btn-hover-color-main-1');
    voteButton.innerHTML = 'Vote';
    voteButton.style.border = 'none';
    voteButton.addEventListener('click', () => {
        window.location.href = `${data.url}/vote`;
    });
    voteButton.classList.add('vp-text', 'shadow');
    voteCell.appendChild(voteButton);
    row.appendChild(voteCell);

    // Append the row to the DayZ list
    dayzList.appendChild(row);
}

// Add DayZ servers
const dayzServers = [
    "mhoSr6f8l2mQCdxfdEnpyYPUZQfDbfUP0K", // DayZ API Key
];

// Fetch and display information for each DayZ server
dayzServers.forEach(server => fetchDayZ(server));

// Check if the current display is mobile
function isMobileDisplay() {
    return window.innerWidth < 576; // Define your desired breakpoint for mobile display
}
