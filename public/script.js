// DOM elements
const createTableBtn = document.getElementById('createTableBtn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementsByClassName('close')[0];
const tableForm = document.getElementById('tableForm');
const tableContainer = document.getElementById('tableContainer');
const searchInput = document.getElementById('searchInput');
const messageContainer = document.getElementById('messageContainer');

// Load tables from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTables);

// Event listeners
createTableBtn.onclick = openModal;
closeBtn.onclick = closeModal;
window.onclick = (event) => {
    if (event.target == modal) closeModal();
};

tableForm.onsubmit = function(e) {
    e.preventDefault();
    const tableName = document.getElementById('tableName').value;
    const seatCount = document.getElementById('seatCount').value;
    const tableType = document.querySelector('.shape-option.selected').dataset.shape;
    const description = document.getElementById('description').value;

    const table = { name: tableName, type: tableType, seats: seatCount, description };

    saveTable(table);
    createTableCard(table);
    closeModal();
    tableForm.reset();
    showMessage('Table created successfully!', 'success');
};

function saveTable(table) {
    let tables = JSON.parse(localStorage.getItem('tables')) || [];
    tables.push(table);
    localStorage.setItem('tables', JSON.stringify(tables));
}

function loadTables() {
    let tables = JSON.parse(localStorage.getItem('tables')) || [];
    tableContainer.innerHTML = '';
    tables.forEach(createTableCard);
}

function createTableCard(table) {
    const tableCard = document.createElement('div');
    tableCard.className = 'table-card glassmorphism';
    tableCard.style.opacity = 0;
    
    const imageUrl = table.type === 'circle' 
        ? './assets/images/rounded-table.jpg'
        : './assets/images/rectangled-table.jpg';
    
        tableCard.innerHTML = `
        <img src="${imageUrl}" alt="${table.name}" class="table-image">
        <h3>${table.name}</h3>
        <p>${table.description}</p>
        <p>Seats: ${table.seats}</p>
        <p>Type: ${table.type}</p>
        <div class="table-actions">
                    <button class="delete-btn neumorphism" onclick="deleteTable('${table.name}')"><i class="fas fa-trash"></i></button>

            <button class="edit-btn neumorphism" onclick="editTable('${table.name}')"><i class="fas fa-edit"></i></button>
        </div>
    `;

    tableContainer.appendChild(tableCard);
    setTimeout(() => tableCard.style.opacity = 1, 10);
}

function editTable(tableName) {
    window.location.href = `table-view.html?name=${encodeURIComponent(tableName)}`;
}

function deleteTable(tableName) {
    let tables = JSON.parse(localStorage.getItem('tables')) || [];
    tables = tables.filter(t => t.name !== tableName);
    localStorage.setItem('tables', JSON.stringify(tables));
    loadTables();
    showMessage('Table deleted successfully!', 'success');
}

function showMessage(message, type) {
    messageContainer.textContent = message;
    messageContainer.className = `message-container ${type}`;
    messageContainer.style.display = 'block';
    setTimeout(() => messageContainer.style.opacity = 1, 10);
    setTimeout(() => {
        messageContainer.style.opacity = 0;
        setTimeout(() => messageContainer.style.display = 'none', 300);
    }, 3000);
}

// Search functionality
searchInput.addEventListener('keyup', function() {
    const searchTerm = this.value.toLowerCase();
    const tableCards = document.querySelectorAll('.table-card');
    
    tableCards.forEach(card => {
        const tableName = card.querySelector('h3').textContent.toLowerCase();
        if (tableName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Shape selector functionality
const shapeOptions = document.querySelectorAll('.shape-option');
shapeOptions.forEach(option => {
    option.addEventListener('click', () => {
        shapeOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        updateTablePreview();
    });
});

// Quantity input functionality
const quantityInput = document.getElementById('seatCount');
const minusBtn = document.querySelector('.quantity__minus');
const plusBtn = document.querySelector('.quantity__plus');

minusBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
        quantityInput.value = value - 1;
        updateTablePreview();
    }
});

plusBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    if (value < 12) {
        quantityInput.value = value + 1;
        updateTablePreview();
    }
});

quantityInput.addEventListener('input', () => {
    let value = parseInt(quantityInput.value);
    if (isNaN(value) || value < 1) {
        quantityInput.value = 1;
    } else if (value > 12) {
        quantityInput.value = 12;
    }
    updateTablePreview();
});

// Table preview functionality
function updateTablePreview() {
    const previewContainer = document.getElementById('tablePreview');
    const tableType = document.querySelector('.shape-option.selected').dataset.shape;
    const seatCount = parseInt(document.getElementById('seatCount').value);

    const imageUrl = tableType === 'circle' 
        ? './assets/images/rounded-table.jpg'
        : './assets/images/rectangled-table.jpg';

    previewContainer.innerHTML = `
        <img src="${imageUrl}" alt="Table Preview" class="preview-image">
    `;
}

// Modal functionality
function openModal() {
    modal.style.display = 'block';
    setTimeout(() => modal.style.opacity = 1, 10);
    document.body.style.overflow = 'hidden';
    updateTablePreview();
}

function closeModal() {
    modal.style.opacity = 0;
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Initialize preview on page load
document.addEventListener('DOMContentLoaded', updateTablePreview);