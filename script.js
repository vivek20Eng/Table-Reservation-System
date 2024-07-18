const createTableBtn = document.getElementById('createTableBtn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementsByClassName('close')[0];
const tableForm = document.getElementById('tableForm');
const tableContainer = document.getElementById('tableContainer');

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

    const tableCard = document.createElement('div');
    tableCard.className = 'table-card';
    tableCard.innerHTML = `
        <h3>${tableName}</h3>
        <p>Type: ${tableType}</p>
        <p>Seats: ${seatCount}</p>
    `;

    tableCard.onclick = function() {
        window.location.href = `table.html?name=${tableName}&type=${tableType}&seats=${seatCount}`;
    }

    tableContainer.appendChild(tableCard);
    modal.style.display = "none";
    tableForm.reset();
}