FETCHDATATIMEOUT_SE = 3 * 60 * 1000; // 3 minutes

function fetchSpaceEngineers(serverId) {
    fetch(`https://space-engineers.com/api/?object=servers&element=detail&key=${serverId}`)
        .then(r => r.json())
        .then(data => printSpaceEngineers(serverId, data));
    setTimeout(() => fetchSpaceEngineers(serverId), FETCHDATATIMEOUT_SE);
}

function printSpaceEngineers(serverId, data) {
    console.log('Printing Space Engineers Data:', data);
    const spaceEngineersList = document.querySelector('#spaceEngineersList');

    const existingRow = document.getElementById(`spaceEngineers-${serverId}`)
    if (existingRow) {
        spaceEngineersList.removeChild(existingRow);
    }

    const index = serversSE.indexOf(serverId);
    const row = document.createElement('tr');
    row.id = `spaceEngineers-${serverId}`;

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

    // Replace data.name with 'Space Engineers' on mobile display
    const serverName = isMobileDisplaySE() ? 'ZLG Space Engineers' : (data.name.length > 30 ? data.name.substring(0, 37) + '...' : data.name);

    serverNameCell.textContent = serverName;
    row.appendChild(serverNameCell);

    // Hide version on mobile display
    if (!isMobileDisplaySE()) {
        const versionCell = document.createElement('td');
        const version = data.version.replace(/[^\d.]/g, ''); // Remove non-digit characters
        versionCell.classList.add('vp-text')
        versionCell.textContent = version;
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
    if (!isMobileDisplaySE()) {
        const connectCell = document.createElement('td');
        connectCell.classList.add('text-center');
        const joinButton = document.createElement('button');
        joinButton.classList.add('nk-btn', 'nk-btn-rounded', 'nk-btn-color-dark-3', 'nk-btn-hover-color-main-1');
        // joinButton.style.backgroundColor = '#FE842C';
        joinButton.innerHTML = 'Join';
        joinButton.style.border = 'none';
        joinButton.addEventListener('click', () => {
            window.location.href = `steam://connect/${data.address}:${data.port}`;
        });
        joinButton.classList.add('vp-text', 'shadow')
        connectCell.appendChild(joinButton);
        row.appendChild(connectCell);
    }

    spaceEngineersList.appendChild(row);
}

function addSpaceEngineers(serverId) {
    fetchSpaceEngineers(serverId);
}

const serversSE = [
    "wnnVEeVn8OqF9wOyDzYw9XeypaTxk2qhD",
];

serversSE.forEach(server => addSpaceEngineers(server));

function isMobileDisplaySE() {
    return window.innerWidth < 576;
}