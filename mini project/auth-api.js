// ============================================
// AUTHENTICATION API CALLS
// ============================================

const API_BASE_URL = 'http://localhost:5000/api';

// API Error Handler
function handleApiError(error) {
    console.error('API Error:', error);
    return {
        success: false,
        message: '❌ Network error - Backend से connect नहीं हो पाए'
    };
}

// ============================================
// SIGNUP API
// ============================================
async function signupViaAPI(name, email, password, confirmPassword) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
        });

        const data = await response.json();
        return data;

    } catch (error) {
        return handleApiError(error);
    }
}

// ============================================
// LOGIN API
// ============================================
async function loginViaAPI(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        
        if (data.success) {
            // Store user data in localStorage
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            localStorage.setItem('authToken', data.token);
        }
        
        return data;

    } catch (error) {
        return handleApiError(error);
    }
}

// ============================================
// GET USER PROFILE
// ============================================
async function getUserProfile(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        const data = await response.json();
        return data;

    } catch (error) {
        return handleApiError(error);
    }
}

// ============================================
// UPDATE USER PROFILE
// ============================================
async function updateUserProfile(userId, updateData) {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(updateData)
        });

        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
        }
        
        return data;

    } catch (error) {
        return handleApiError(error);
    }
}

// ============================================
// CHANGE PASSWORD
// ============================================
async function changePassword(userId, oldPassword, newPassword, confirmPassword) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
                user_id: userId,
                old_password: oldPassword,
                new_password: newPassword,
                confirm_password: confirmPassword
            })
        });

        const data = await response.json();
        return data;

    } catch (error) {
        return handleApiError(error);
    }
}

// ============================================
// GET CURRENT USER
// ============================================
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// ============================================
// LOGOUT
// ============================================
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    location.reload();
}

// ============================================
// CHECK IF USER IS LOGGED IN
// ============================================
function isUserLoggedIn() {
    return localStorage.getItem('authToken') !== null;
}
