// Import SweetAlert2 library for enhanced alerts and notifications
import Swal from 'sweetalert2';

// Global variables for application state management
let products = []; // Array to store all product objects
let currentEditingId = null; // Tracks the ID of product being edited
let nextId = 1; // Auto-increment counter for product IDs

// Displays toast notifications to user
function showToast(type, message) {
    // Configure toast notification settings
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        // Pause timer on mouse hover
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    // Display the toast with specified type and message
    Toast.fire({
        icon: type,
        title: message
    });
}

// Adds a new product to the products array
function addProduct(name, quantity, price) {
    // Create new product object with auto-incremented ID
    const product = {
        id: nextId++,
        name: name,
        quantity: parseInt(quantity),
        price: parseFloat(price)
    };
    // Add product to array and update display
    products.push(product);
    renderTable();
    showToast("success", "Product saved successfully");
}

// Updates an existing product in the products array
function updateProduct(id, name, quantity, price) {
    // Find product index by ID
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
        // Update product data at found index
        products[productIndex] = {
            id: id,
            name: name,
            quantity: parseInt(quantity),
            price: parseFloat(price)
        };
        // Refresh table display and show confirmation
        renderTable();
        showToast("success", "Product updated successfully");
    }
}

// Deletes a product from the products array with confirmation
function deleteProduct(id) {
    // Show confirmation dialog before deletion
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        // Execute deletion if user confirms
        if (result.isConfirmed) {
            // Filter out the product with matching ID
            products = products.filter(product => product.id !== id);
            renderTable();
            showToast("success", "Product deleted successfully");
        }
    });
}

// Renders the products table with current data
function renderTable() {
    // Get table body element
    const tbody = document.querySelector('.t-body');
    // Clear existing table content
    tbody.innerHTML = '';

    // Create table row for each product
    products.forEach(product => {
        const tr = document.createElement('tr');

        // Create and populate ID cell
        const tdId = document.createElement('td');
        tdId.textContent = product.id;
        tr.appendChild(tdId);

        // Create and populate product name cell
        const tdProduct = document.createElement('td');
        tdProduct.textContent = product.name;
        tr.appendChild(tdProduct);

        // Create and populate quantity cell
        const tdQuantity = document.createElement('td');
        tdQuantity.textContent = product.quantity;
        tr.appendChild(tdQuantity);

        // Create and populate price cell with currency formatting
        const tdPrice = document.createElement('td');
        tdPrice.textContent = `$${product.price.toFixed(2)}`;
        tr.appendChild(tdPrice);

        // Create options cell with action buttons
        const tdOptions = document.createElement('td');
        const divBtns = document.createElement('div');
        divBtns.className = 'td-btn';

        // Create update button with click handler
        const btnUpdate = document.createElement('button');
        btnUpdate.textContent = 'Update';
        btnUpdate.className = 'btn-update';
        btnUpdate.addEventListener('click', (e) => {
            e.preventDefault();
            editProduct(product.id);
        });

        // Create delete button with click handler
        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Delete';
        btnDelete.className = 'btn-delete';
        btnDelete.addEventListener('click', (e) => {
            e.preventDefault();
            deleteProduct(product.id);
        });

        // Append buttons to container and add to row
        divBtns.appendChild(btnUpdate);
        divBtns.appendChild(btnDelete);
        tdOptions.appendChild(divBtns);
        tr.appendChild(tdOptions);

        // Add completed row to table body
        tbody.appendChild(tr);
    });
}

// Loads product data into form for editing
function editProduct(id) {
    // Find product by ID
    const product = products.find(p => p.id === id);
    if (product) {
        // Populate form fields with product data
        document.getElementById('product').value = product.name;
        document.getElementById('quantity').value = product.quantity;
        document.getElementById('price').value = product.price;
        // Set editing state
        currentEditingId = id;
        
        // Change save button to update mode
        const saveBtn = document.getElementById('btn-save');
        saveBtn.textContent = 'Update';
        saveBtn.classList.add('editing');
        showToast("info", "Product loaded for editing");
    }
}

// Clears all form fields and resets editing state
function clearForm() {
    // Clear all input fields
    document.getElementById('product').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';
    // Reset editing state
    currentEditingId = null;
    
    // Reset save button to normal mode
    const saveBtn = document.getElementById('btn-save');
    saveBtn.textContent = 'Save';
    saveBtn.classList.remove('editing');
}

// Validates form input data before processing
function validateForm(name, quantity, price) {
    // Check if product name is provided and not empty
    if (!name.trim()) {
        showToast('error', 'Please enter a product name');
        return false;
    }
    // Check if quantity is valid (positive number)
    if (!quantity || quantity <= 0) {
        showToast('error', 'Please enter a valid quantity');
        return false;
    }
    // Check if price is valid (positive number)
    if (!price || price <= 0) {
        showToast('error', 'Please enter a valid price');
        return false;
    }
    return true;
}

// Initialize event listeners when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get button references
    const btnSave = document.getElementById('btn-save');
    const btnClear = document.getElementById('btn-clear');

    // Save button click handler
    btnSave.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Get form input values
        const name = document.getElementById('product').value;
        const quantity = document.getElementById('quantity').value;  
        const price = document.getElementById('price').value;

        // Validate form and process if valid
        if (validateForm(name, quantity, price)) {
            // Update existing product or add new one
            if (currentEditingId) {
                updateProduct(currentEditingId, name, quantity, price);
            } else {
                addProduct(name, quantity, price);
            }
            // Clear form after successful operation
            clearForm();
        }
    });

    // Clear button click handler
    btnClear.addEventListener('click', (event) => {
        event.preventDefault();
        clearForm();
        showToast('info', 'Form cleared');
    });
});