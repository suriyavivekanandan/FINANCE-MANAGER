// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user && !window.location.href.includes('index.html') && !window.location.href.includes('signup.html')) {
        window.location.href = 'index.html';
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation (in real app, this would connect to a backend)
    if (email && password) {
        localStorage.setItem('user', JSON.stringify({ email }));
        window.location.href = 'dashboard.html';
    }
}

// Handle signup
function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation (in real app, this would connect to a backend)
    if (name && email && password) {
        localStorage.setItem('user', JSON.stringify({ name, email }));
        window.location.href = 'dashboard.html';
    }
}


function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}


checkAuth();