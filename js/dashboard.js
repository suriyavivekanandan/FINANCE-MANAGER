// Initialize dashboard data
function initDashboard() {
    updateBalances();
}

// Update balance displays
function updateBalances() {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            income += parseFloat(transaction.amount);
        } else {
            expenses += parseFloat(transaction.amount);
        }
    });

    const balance = income - expenses;

    document.getElementById('totalBalance').textContent = `$${balance.toFixed(2)}`;
    document.getElementById('totalIncome').textContent = `$${income.toFixed(2)}`;
    document.getElementById('totalExpenses').textContent = `$${expenses.toFixed(2)}`;
}

// Handle new transaction
function handleTransaction(event) {
    event.preventDefault();
    
    const type = document.getElementById('transactionType').value;
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;

    const transaction = {
        id: Date.now(),
        date: new Date().toISOString(),
        type,
        amount,
        description
    };

    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    updateBalances();
    event.target.reset();
}

// Initialize dashboard on page load
initDashboard();
function logout() {
    // Perform any logout operations, such as clearing session data
    console.log("User logged out.");

    // Redirect to index.html
    window.location.href = 'index.html';
}
