FETCHDATATIMEOUT = 3 * 60 * 1000; // 3 minutes

function fetchData(serverId) {
    fetch(`https://ark-servers.net/api/?object=servers&element=detail&key=${serverId}`)
        .then(r => r.json())
        .then(data => printData(serverId, data))
    setTimeout(() => fetchData(serverId), FETCHDATATIMEOUT);
}

function printData(serverId, data) {
    const serverElement = document.querySelector(`#server-${serverId}`);
    serverElement.querySelector('.mapName').innerText = data.map;
    serverElement.querySelector('.serverName').innerText = data.name;
    serverElement.querySelector('.version').innerText = data.version;
    serverElement.querySelector('.playerCount').innerText = data.players;
    serverElement.querySelector('.playerMax').innerText = data.maxplayers;
    serverElement.querySelector('.voteLink').href = `${data.url}/vote`;
    serverElement.querySelector('.connect').href = `steam://connect/${data.address}:${data.query_port}`;
    const onlineDot = serverElement.querySelector('.onlineDot');
    if(data.is_online == "1") {
        onlineDot.classList.add("green");
    } else {
        onlineDot.classList.remove("green");
    }
}

function addServer(serverId) {
    const template = document.querySelector('#arkServerTemplate');
    const serverListDiv = document.querySelector('#serverList');
    const clone = template.content.cloneNode(true);
    const serverDiv = clone.querySelector('.serverContainer');
    serverDiv.id = `server-${serverId}`;
    serverListDiv.appendChild(serverDiv);
    fetchData(serverId);
}

const servers = [
    "MISmmW0t8yaNJms5gMTbEjmGxVqz8iuG5p", // Fjordur
    "h7IFGiljgUR6BEb91tp9R6OkMj13qbwJJUC", // The Island
    "zVWn9ReW6svMkg9Je5YFAwjeD5n910nOiq", // Crystal Isles
    "oX1wbBCLrsco7ofhQnXK7wZi8QBZhMy7", // Ragnarok
    "Elmv22OFOYsXdfSuy6LHrzEd8NosFzoz4WI", // Valguero
    "1O4EtWbXiiglPVOS8bBRDMS1VKVrWrYa2X7", // Extinction
    "cW9UcrVr00R3rCIrDuzBOLADvX1WVyXJgYw", // Genesis 1
    "nihFR0dWYbN1eLfKk4wbZEZMNHdXXu8AnAZ", // Aberration
    "t66dahEDtlQkyxV4y8YTdD9AXdadRYb6Bzt", // The Center
    "f882ntGWodky9ENGd1J3jk8opVaOMZ03VV", // Scorched Earth
    "z4Q7KfrPBUhx6ma4Ur1bJAonYHhRV21O66X", // Lost Island
    "Pw1HoXknIDfSxDlJHVvsqz0mftoNWfABxNc" // Genesis 2
    
];
servers.forEach(server => addServer(server));

