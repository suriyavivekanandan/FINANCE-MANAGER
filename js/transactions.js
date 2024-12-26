// Load and display transactions
function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const tbody = document.getElementById('transactionsList');
    tbody.innerHTML = '';

    transactions.reverse().forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(transaction.date).toLocaleDateString()}</td>
            <td><span class="badge bg-${transaction.type === 'income' ? 'success' : 'danger'}">${transaction.type}</span></td>
            <td>${transaction.description}</td>
            <td>$${parseFloat(transaction.amount).toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="deleteTransaction(${transaction.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Delete transaction
function deleteTransaction(id) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        transactions = transactions.filter(t => t.id !== id);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        loadTransactions();
    }
}

// Load transactions on page load
loadTransactions();