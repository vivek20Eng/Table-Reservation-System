const createTableBtn = document.getElementById('createTableBtn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementsByClassName('close')[0];
const tableForm = document.getElementById('tableForm');
const tableContainer = document.getElementById('tableContainer');

// Load tables from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTables);

createTableBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

tableForm.onsubmit = function(e) {
    e.preventDefault();
    const tableName = document.getElementById('tableName').value;
    const tableType = document.getElementById('tableType').value;
    const seatCount = document.getElementById('seatCount').value;

    // Create table object
    const table = {
        name: tableName,
        type: tableType,
        seats: seatCount
    };

    // Save table to localStorage
    saveTable(table);

    // Create and display table card
    createTableCard(table);

    modal.style.display = "none";
    tableForm.reset();
}

function saveTable(table) {
    let tables = JSON.parse(localStorage.getItem('tables')) || [];
    tables.push(table);
    localStorage.setItem('tables', JSON.stringify(tables));
}

function loadTables() {
    let tables = JSON.parse(localStorage.getItem('tables')) || [];
    tables.forEach(createTableCard);
}

function createTableCard(table) {
    const tableCard = document.createElement('div');
    tableCard.className = 'table-card';
    tableCard.innerHTML = `
        <h3>${table.name}</h3>
        <p>Type: ${table.type}</p>
        <p>Seats: ${table.seats}</p>
    `;

    tableCard.onclick = function() {
        window.location.href = `table.html?name=${table.name}&type=${table.type}&seats=${table.seats}`;
    }

    tableContainer.appendChild(tableCard);
}