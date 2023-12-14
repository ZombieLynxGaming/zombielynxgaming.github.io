FETCHDATATIMEOUT = 3 * 60 * 1000; // 3 minutes

function fetchEco(ecoId) {
    fetch(`https://ecoservers.io/api/?object=servers&element=detail&key=${ecoId}`)
        .then(r => r.json())
        .then(data => printEco(ecoId, data));
    setTimeout(() => fetchEco(ecoId), FETCHDATATIMEOUT);
}

function printEco(ecoId, data) {
    const ecoList = document.querySelector('#ecoList');

    const existingRow = document.getElementById(`eco-${ecoId}`)
    if (existingRow) {
        ecoList.removeChild(existingRow);
    }

    const row = document.createElement('tr');
    row.id = `eco-${ecoId}`;

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

    const serverNameCell = document.createElement('td');
    serverNameCell.classList.add('text-start', 'ps-4', 'server-name');

    // Replace data.name with 'Eco' on mobile display
    const serverName = isMobileDisplay() ? 'ZLG Eco' : (data.name.length > 30 ? data.name.substring(0, 37) + '...' : data.name);

    serverNameCell.textContent = serverName;
    row.appendChild(serverNameCell);

    // Hide version on mobile display
    if (!isMobileDisplay()) {
        const versionCell = document.createElement('td');
        const version = data.version.replace(/[^\d.]/g, ''); // Remove non-digit characters
        versionCell.classList.add('vp-text')
        versionCell.textContent = version;
        row.appendChild(versionCell);
    }

    const playerCountCell = document.createElement('td');
    playerCountCell.textContent = `${data.players} / 100`;
    playerCountCell.classList.add('vp-text')
    row.appendChild(playerCountCell);

    const voteCell = document.createElement('td');
    voteCell.classList.add('text-center');
    const voteButton = document.createElement('button');
    voteButton.classList.add('nk-btn', 'nk-btn-rounded', 'nk-btn-color-dark-3', 'nk-btn-hover-color-main-1');
    // voteButton.style.backgroundColor = '#FE842C';
    voteButton.innerHTML = 'Vote';
    voteButton.style.border = 'none';
    voteButton.addEventListener('click', () => {
        window.location.href = `${data.url}/vote`;
    });
    voteButton.classList.add('vp-text', 'shadow')
    voteCell.appendChild(voteButton);
    row.appendChild(voteCell);

    // Hide connect button on mobile display
    if (!isMobileDisplay()) {
        const connectCell = document.createElement('td');
        connectCell.classList.add('text-center');
        const joinButton = document.createElement('button');
        joinButton.classList.add('nk-btn', 'nk-btn-rounded', 'nk-btn-color-dark-3', 'nk-btn-hover-color-main-1');
        // joinButton.style.backgroundColor = '#FE842C';
        joinButton.innerHTML = 'Join';
        joinButton.style.border = 'none';
        joinButton.addEventListener('click', () => {
            window.location.href = `steam://connect/${data.address}:${data.query_port}`;
        });
        joinButton.classList.add('vp-text', 'shadow')
        connectCell.appendChild(joinButton);
        row.appendChild(connectCell);
    }

    ecoList.appendChild(row);
}

function addEco(ecoId) {
    fetchEco(ecoId);
}

const ecos = [
    "VctwUUBdTXBX1PDL4bvscOUR1QyTRV21G", // Eco 
];
ecos.forEach(eco => addEco(eco));

function isMobileDisplay() {
    return window.innerWidth < 576; // Define your desired breakpoint for mobile display
}
