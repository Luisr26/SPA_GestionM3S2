import Swal from 'sweetalert2';

let products = [];
let currentEditingId = null;
let nextId = 1;

function showToast(type, message) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    Toast.fire({
        icon: type,
        title: message
    });
}

function addProduct(name, quantity, price) {
    const product = {
        id: nextId++,
        name: name,
        quantity: parseInt(quantity),
        price: parseFloat(price)
    };
    products.push(product);
    renderTable();
    showToast("success", "Product saved successfully");
}

function updateProduct(id, name, quantity, price) {
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
        products[productIndex] = {
            id: id,
            name: name,
            quantity: parseInt(quantity),
            price: parseFloat(price)
        };
        renderTable();
        showToast("success", "Product updated successfully");
    }
}

function deleteProduct(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            products = products.filter(product => product.id !== id);
            renderTable();
            showToast("success", "Product deleted successfully");
        }
    });
}

function renderTable() {
    const tbody = document.querySelector('.t-body');
    tbody.innerHTML = '';

    products.forEach(product => {
        const tr = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = product.id;
        tr.appendChild(tdId);

        const tdProduct = document.createElement('td');
        tdProduct.textContent = product.name;
        tr.appendChild(tdProduct);

        const tdQuantity = document.createElement('td');
        tdQuantity.textContent = product.quantity;
        tr.appendChild(tdQuantity);

        const tdPrice = document.createElement('td');
        tdPrice.textContent = `$${product.price.toFixed(2)}`;
        tr.appendChild(tdPrice);

        const tdOptions = document.createElement('td');
        const divBtns = document.createElement('div');
        divBtns.className = 'td-btn';

        const btnUpdate = document.createElement('button');
        btnUpdate.textContent = 'Update';
        btnUpdate.className = 'btn-update';
        btnUpdate.addEventListener('click', (e) => {
            e.preventDefault();
            editProduct(product.id);
        });

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Delete';
        btnDelete.className = 'btn-delete';
        btnDelete.addEventListener('click', (e) => {
            e.preventDefault();
            deleteProduct(product.id);
        });

        divBtns.appendChild(btnUpdate);
        divBtns.appendChild(btnDelete);
        tdOptions.appendChild(divBtns);
        tr.appendChild(tdOptions);

        tbody.appendChild(tr);
    });
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('product').value = product.name;
        document.getElementById('quantity').value = product.quantity;
        document.getElementById('price').value = product.price;
        currentEditingId = id;
        
        const saveBtn = document.getElementById('btn-save');
        saveBtn.textContent = 'Update';
        saveBtn.classList.add('editing');
        showToast("info", "Product loaded for editing");
    }
}

function clearForm() {
    document.getElementById('product').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';
    currentEditingId = null;
    
    const saveBtn = document.getElementById('btn-save');
    saveBtn.textContent = 'Save';
    saveBtn.classList.remove('editing');
}

function validateForm(name, quantity, price) {
    if (!name.trim()) {
        showToast('error', 'Please enter a product name');
        return false;
    }
    if (!quantity || quantity <= 0) {
        showToast('error', 'Please enter a valid quantity');
        return false;
    }
    if (!price || price <= 0) {
        showToast('error', 'Please enter a valid price');
        return false;
    }
    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    const btnSave = document.getElementById('btn-save');
    const btnClear = document.getElementById('btn-clear');

    btnSave.addEventListener('click', (event) => {
        event.preventDefault();
        
        const name = document.getElementById('product').value;
        const quantity = document.getElementById('quantity').value;  
        const price = document.getElementById('price').value;

        if (validateForm(name, quantity, price)) {
            if (currentEditingId) {
                updateProduct(currentEditingId, name, quantity, price);
            } else {
                addProduct(name, quantity, price);
            }
            clearForm();
        }
    });

    btnClear.addEventListener('click', (event) => {
        event.preventDefault();
        clearForm();
        showToast('info', 'Form cleared');
    });
});