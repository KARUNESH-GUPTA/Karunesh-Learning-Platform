from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os
from werkzeug.security import generate_password_hash, check_password_hash
import re

app = Flask(__name__)
CORS(app)

# Database file path
USERS_DB = 'users.json'

# Initialize database if it doesn't exist
def init_database():
    if not os.path.exists(USERS_DB):
        with open(USERS_DB, 'w') as f:
            json.dump({
                'users': [],
                'sessions': []
            }, f, indent=2)

# Load users from JSON
def load_users():
    try:
        with open(USERS_DB, 'r') as f:
            data = json.load(f)
            return data.get('users', [])
    except:
        return []

# Save users to JSON
def save_users(users):
    try:
        with open(USERS_DB, 'r') as f:
            data = json.load(f)
        data['users'] = users
        with open(USERS_DB, 'w') as f:
            json.dump(data, f, indent=2)
        return True
    except:
        return False

# Email validation
def is_valid_email(email):
    pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    return re.match(pattern, email) is not None

# Find user by email
def find_user_by_email(email):
    users = load_users()
    for user in users:
        if user['email'].lower() == email.lower():
            return user
    return None

# Find user by ID
def find_user_by_id(user_id):
    users = load_users()
    for user in users:
        if user['id'] == user_id:
            return user
    return None

# ============================================
# SIGNUP ENDPOINT
# ============================================
@app.route('/api/auth/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        
        # Validate input
        if not data:
            return jsonify({'success': False, 'message': '❌ No data provided'}), 400
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()
        confirm_password = data.get('confirmPassword', '').strip()
        
        # Validation checks
        if not all([name, email, password, confirm_password]):
            return jsonify({'success': False, 'message': '❌ सभी fields को भरें'}), 400
        
        if not is_valid_email(email):
            return jsonify({'success': False, 'message': '❌ Invalid email format'}), 400
        
        if len(password) < 6:
            return jsonify({'success': False, 'message': '❌ Password कम से कम 6 characters होना चाहिए'}), 400
        
        if password != confirm_password:
            return jsonify({'success': False, 'message': '❌ Passwords match नहीं करते'}), 400
        
        # Check if user already exists
        if find_user_by_email(email):
            return jsonify({'success': False, 'message': '❌ यह email पहले से registered है'}), 409
        
        # Create new user
        users = load_users()
        new_user = {
            'id': len(users) + 1,
            'name': name,
            'email': email,
            'password': generate_password_hash(password),
            'created_at': datetime.now().isoformat(),
            'last_login': None,
            'profile_complete': False,
            'preferences': {
                'theme': 'light',
                'notifications': True
            }
        }
        
        users.append(new_user)
        
        if save_users(users):
            return jsonify({
                'success': True,
                'message': '✅ Account successfully created!',
                'user': {
                    'id': new_user['id'],
                    'name': new_user['name'],
                    'email': new_user['email']
                }
            }), 201
        else:
            return jsonify({'success': False, 'message': '❌ Database error'}), 500
            
    except Exception as e:
        return jsonify({'success': False, 'message': f'❌ Error: {str(e)}'}), 500

# ============================================
# LOGIN ENDPOINT
# ============================================
@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'message': '❌ No data provided'}), 400
        
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()
        
        if not email or not password:
            return jsonify({'success': False, 'message': '❌ Email और Password दोनों जरूरी हैं'}), 400
        
        # Find user
        user = find_user_by_email(email)
        
        if not user:
            return jsonify({'success': False, 'message': '❌ यह email registered नहीं है'}), 401
        
        # Check password
        if not check_password_hash(user['password'], password):
            return jsonify({'success': False, 'message': '❌ गलत password'}), 401
        
        # Update last login
        users = load_users()
        for u in users:
            if u['id'] == user['id']:
                u['last_login'] = datetime.now().isoformat()
        save_users(users)
        
        # Generate session token (simple implementation)
        session_token = f"token_{user['id']}_{datetime.now().timestamp()}"
        
        return jsonify({
            'success': True,
            'message': f'✅ Welcome back, {user["name"]}!',
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'preferences': user.get('preferences', {})
            },
            'token': session_token
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'❌ Error: {str(e)}'}), 500

# ============================================
# GET USER PROFILE
# ============================================
@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = find_user_by_id(user_id)
        
        if not user:
            return jsonify({'success': False, 'message': '❌ User not found'}), 404
        
        return jsonify({
            'success': True,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'created_at': user['created_at'],
                'last_login': user['last_login'],
                'preferences': user.get('preferences', {})
            }
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'❌ Error: {str(e)}'}), 500

# ============================================
# UPDATE USER PROFILE
# ============================================
@app.route('/api/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.get_json()
        user = find_user_by_id(user_id)
        
        if not user:
            return jsonify({'success': False, 'message': '❌ User not found'}), 404
        
        users = load_users()
        for u in users:
            if u['id'] == user_id:
                if 'name' in data:
                    u['name'] = data['name']
                if 'preferences' in data:
                    u['preferences'].update(data['preferences'])
                u['updated_at'] = datetime.now().isoformat()
        
        if save_users(users):
            return jsonify({
                'success': True,
                'message': '✅ Profile updated successfully',
                'user': {
                    'id': u['id'],
                    'name': u['name'],
                    'email': u['email']
                }
            }), 200
        else:
            return jsonify({'success': False, 'message': '❌ Error updating profile'}), 500
            
    except Exception as e:
        return jsonify({'success': False, 'message': f'❌ Error: {str(e)}'}), 500

# ============================================
# CHANGE PASSWORD
# ============================================
@app.route('/api/auth/change-password', methods=['POST'])
def change_password():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        old_password = data.get('old_password')
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')
        
        if not all([user_id, old_password, new_password, confirm_password]):
            return jsonify({'success': False, 'message': '❌ सभी fields required हैं'}), 400
        
        user = find_user_by_id(user_id)
        
        if not user:
            return jsonify({'success': False, 'message': '❌ User not found'}), 404
        
        if not check_password_hash(user['password'], old_password):
            return jsonify({'success': False, 'message': '❌ Current password incorrect है'}), 401
        
        if len(new_password) < 6:
            return jsonify({'success': False, 'message': '❌ New password कम से कम 6 characters होना चाहिए'}), 400
        
        if new_password != confirm_password:
            return jsonify({'success': False, 'message': '❌ Passwords match नहीं करते'}), 400
        
        users = load_users()
        for u in users:
            if u['id'] == user_id:
                u['password'] = generate_password_hash(new_password)
        
        if save_users(users):
            return jsonify({'success': True, 'message': '✅ Password changed successfully'}), 200
        else:
            return jsonify({'success': False, 'message': '❌ Error changing password'}), 500
            
    except Exception as e:
        return jsonify({'success': False, 'message': f'❌ Error: {str(e)}'}), 500

# ============================================
# GET ALL USERS (for admin - demo only)
# ============================================
@app.route('/api/admin/users', methods=['GET'])
def get_all_users():
    try:
        users = load_users()
        user_list = []
        for user in users:
            user_list.append({
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'created_at': user['created_at'],
                'last_login': user['last_login']
            })
        
        return jsonify({
            'success': True,
            'total_users': len(user_list),
            'users': user_list
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'❌ Error: {str(e)}'}), 500

# ============================================
# HEALTH CHECK
# ============================================
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'message': '✅ Backend is running!'}), 200

# Initialize database on startup
if __name__ == '__main__':
    init_database()
    app.run(debug=True, port=5000)
