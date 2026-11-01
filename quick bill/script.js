let invoiceItems = [];

// DOM Element references
const itemNameInput = document.getElementById('itemName');
const itemQtyInput = document.getElementById('itemQty');
const itemPriceInput = document.getElementById('itemPrice');
const addItemBtn = document.getElementById('addItemBtn');
const invoiceTableBody = document.getElementById('invoiceTableBody');
const subtotalDisplay = document.getElementById('subtotalDisplay');
const taxDisplay = document.getElementById('taxDisplay');
const grandTotalDisplay = document.getElementById('grandTotalDisplay');
const printBtn = document.getElementById('printBtn');

// 1. Add item event handler
addItemBtn.addEventListener('click', () => {
    const name = itemNameInput.value.trim();
    const quantity = parseInt(itemQtyInput.value);
    const price = parseFloat(itemPriceInput.value);

    // Basic validation
    if (!name || isNaN(quantity) || quantity <= 0 || isNaN(price) || price < 0) {
        alert('Please enter valid item details.');
        return;
    }

    // Create item object and push to array
    const newItem = {
        id: Date.now().toString(), // Unique ID based on timestamp
        name,
        quantity,
        price
    };

    invoiceItems.push(newItem);

    // Reset input fields
    itemNameInput.value = '';
    itemQtyInput.value = '1';
    itemPriceInput.value = '';
    itemNameInput.focus();

    // Re-render interface
    renderInvoice();
});

// 2. Event Delegation for row deletion on table body
invoiceTableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const idToDelete = event.target.getAttribute('data-id');
        
        // Filter out the deleted item from state array
        invoiceItems = invoiceItems.filter(item => item.id !== idToDelete);
        
        // Re-render interface
        renderInvoice();
    }
});

// 3. Render function handling DOM updates and array.reduce calculations
function renderInvoice() {
    // Clear current table HTML
    invoiceTableBody.innerHTML = '';

    // Guard clause if empty
    if (invoiceItems.length === 0) {
        invoiceTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No items added yet.</td></tr>`;
    }

    // Populate table rows dynamically
    invoiceItems.forEach(item => {
        const lineTotal = item.quantity * item.price;
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${escapeHtml(item.name)}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${lineTotal.toFixed(2)}</td>
            <td class="no-print">
                <button class="btn-danger delete-btn" data-id="${item.id}">Delete</button>
            </td>
        `;
        invoiceTableBody.appendChild(row);
    });

    // Calculate Subtotal using Array.reduce()
    const subtotal = invoiceItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const tax = subtotal * 0.18; // 18% Tax calculation
    const grandTotal = subtotal + tax;

    // Update summary DOM text contents
    subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
    taxDisplay.textContent = `$${tax.toFixed(2)}`;
    grandTotalDisplay.textContent = `$${grandTotal.toFixed(2)}`;
}

// Helper security function to prevent basic script injection in table names
function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// 4. Print action trigger
printBtn.addEventListener('click', () => {
    window.print();
});

// Initial render call on load
renderInvoice();