document.addEventListener('DOMContentLoaded', () => {
    const calendarButton = document.getElementById('calendar-button');
    const calendarContainer = document.getElementById('calendar-container');
    const voiceIcon = document.getElementById('voice-icon');

    calendarButton.addEventListener('click', () => {
        calendarContainer.classList.toggle('hidden');
    });

    voiceIcon.addEventListener('click', () => {
        window.location.href = 'voice-input.html'; // Replace with the actual page
    });

    // Example data
    const expenses = [
        { category: 'Entertainment', amount: 50 },
        { category: 'Food', amount: 100 },
        { category: 'Hospitality', amount: 75 }
    ];

    const credits = [
        { amount: 200 },
        { amount: 150 }
    ];

    const expenseRows = document.getElementById('expense-rows');
    let totalCredited = 0;
    let totalDebited = 0;

    expenses.forEach(expense => {
        const row = document.createElement('tr');
        const categoryCell = document.createElement('td');
        const amountCell = document.createElement('td');

        categoryCell.textContent = expense.category;
        amountCell.textContent = `₹${expense.amount.toFixed(2)}`;

        row.appendChild(categoryCell);
        row.appendChild(amountCell);
        expenseRows.appendChild(row);

        totalDebited += expense.amount;
    });

    credits.forEach(credit => {
        totalCredited += credit.amount;
    });

    document.getElementById('total-balance').textContent = `Total Balance: ₹${(totalCredited - totalDebited).toFixed(2)}`;
    document.getElementById('credit-total').textContent = `Total Credited: ₹${totalCredited.toFixed(2)}`;
    document.getElementById('debit-total').textContent = `Total Debited: ₹${totalDebited.toFixed(2)}`;
});