document.getElementById('save-btn').addEventListener('click', saveExpense);
document.getElementById('file-input').addEventListener('change', handleFileUpload);

let balance = 10000;
let expenses = [];

function handleFileUpload(event) {
    const files = event.target.files;
    const uploadedImages = document.getElementById('uploaded-images');
    uploadedImages.innerHTML = ''; // Clear previous images

    Array.from(files).forEach(file => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const image = new Image();
            image.src = e.target.result;
            uploadedImages.appendChild(image);

            // Simulate automatic extraction of amount and category from receipt
            // For demonstration purposes, we'll use fixed values
            const extractedAmount = Math.floor(Math.random() * 100) + 1; // Simulated extracted amount
            const categories = ['food', 'entertainment', 'shopping'];
            const extractedCategory = categories[Math.floor(Math.random() * categories.length)]; // Simulated extracted category

            addExpense(extractedAmount, extractedCategory);
        };
        reader.readAsDataURL(file);
    });
}

function saveExpense() {
    const amount = parseFloat(document.getElementById('amount-input').value);
    const category = document.getElementById('category-input').value;

    if (isNaN(amount) || !category) {
        alert('Please enter a valid amount and select a category.');
        return;
    }

    addExpense(amount, category);

    // Clear the input fields for the next entry
    document.getElementById('amount-input').value = '';
    document.getElementById('category-input').value = '';
}

function addExpense(amount, category) {
    expenses.push({ amount, category });
    balance -= amount;
    updateUI();
}

function updateUI() {
    document.getElementById('balance').textContent = balance.toFixed(2);

    const expenseList = document.getElementById('expenses');
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.category}: ₹${expense.amount.toFixed(2)}`;
        expenseList.appendChild(li);
    });
}