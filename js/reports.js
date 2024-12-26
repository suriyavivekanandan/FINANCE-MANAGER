// Initialize charts
function initCharts() {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    
    // Monthly Overview Chart
    const monthlyData = getMonthlyData(transactions);
    const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');
    new Chart(monthlyCtx, {
        type: 'bar',
        data: {
            labels: monthlyData.labels,
            datasets: [
                {
                    label: 'Income',
                    data: monthlyData.income,
                    backgroundColor: 'rgba(40, 167, 69, 0.5)',
                    borderColor: 'rgb(40, 167, 69)',
                    borderWidth: 1
                },
                {
                    label: 'Expenses',
                    data: monthlyData.expenses,
                    backgroundColor: 'rgba(220, 53, 69, 0.5)',
                    borderColor: 'rgb(220, 53, 69)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Category Chart
    const categoryData = getCategoryData(transactions);
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    new Chart(categoryCtx, {
        type: 'pie',
        data: {
            labels: categoryData.labels,
            datasets: [{
                data: categoryData.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}

// Get monthly data for chart
function getMonthlyData(transactions) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const income = new Array(12).fill(0);
    const expenses = new Array(12).fill(0);

    transactions.forEach(transaction => {
        const month = new Date(transaction.date).getMonth();
        if (transaction.type === 'income') {
            income[month] += parseFloat(transaction.amount);
        } else {
            expenses[month] += parseFloat(transaction.amount);
        }
    });

    return {
        labels: months,
        income,
        expenses
    };
}

// Get category data for chart
function getCategoryData(transactions) {
    const categories = {};
    
    transactions.filter(t => t.type === 'expense').forEach(transaction => {
        const category = transaction.description.split(' ')[0];
        categories[category] = (categories[category] || 0) + parseFloat(transaction.amount);
    });

    return {
        labels: Object.keys(categories),
        data: Object.values(categories)
    };
}

// Initialize charts on page load
initCharts();