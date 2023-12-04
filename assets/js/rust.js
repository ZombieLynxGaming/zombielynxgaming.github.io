fetchRustTIMEOUT = 3 * 60 * 1000; // 3 minutes

function fetchRust(rustId) {
    fetch(`https://rust-servers.net/api/?object=servers&element=detail&key=${rustId}`)
        .then(r => r.json())
        .then(data => printRust(rustId, data));
    setTimeout(() => fetchRust(rustId), fetchRustTIMEOUT);
}

function printRust(rustId, data) {
    const rustList = document.querySelector('#rustList');

    const existingRow = document.getElementById(`rust-${rustId}`);
    if (existingRow) {
        rustList.removeChild(existingRow);
    }

    const row = document.createElement('tr');
    row.id = `rust-${rustId}`;

    const statusCell = document.createElement('td');
    statusCell.classList.add('text-center');
    const onlineDot = document.createElement('img');

    if (data.is_online == '1') {
        onlineDot.src = './assets/images/online.png'; // Display online.png for online servers
        onlineDot.alt = 'Online';
    } else {
        onlineDot.src = './assets/images/offline.png'; // Display offline.png for offline servers
        onlineDot.alt = 'Offline';
    }
    statusCell.appendChild(onlineDot);
    row.appendChild(statusCell);

    const serverNameCell = document.createElement('td');
    serverNameCell.classList.add('text-start', 'ps-4', 'server-name');

    // Replace data.name with 'Rust' on mobile display
    const serverName = isMobileDisplay() ? 'ZLG Rust' : (data.name.length > 30 ? data.name.substring(0, 37) + '...' : data.name);

    serverNameCell.textContent = serverName;
    row.appendChild(serverNameCell);

    // Hide version on mobile display
    if (!isMobileDisplay()) {
        const versionCell = document.createElement('td');
        versionCell.textContent = data.version;
        versionCell.classList.add('vp-text')
        row.appendChild(versionCell);
    }

    const playerCountCell = document.createElement('td');
    playerCountCell.textContent = `${data.players} / ${data.maxplayers}`;
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

    rustList.appendChild(row);
}

function addRust(rustId) {
    fetchRust(rustId);
}

const rusts = [
    "GbKIS8WOKbSve4coOvcU0W2zO2DE3Ib4023", // Rust
];
rusts.forEach(rust => addRust(rust));

function isMobileDisplay() {
    return window.innerWidth < 576; // Define your desired breakpoint for mobile display
}
