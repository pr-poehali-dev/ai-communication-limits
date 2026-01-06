"""
API для аутентификации пользователей (регистрация, вход, выход)
"""
import json
import os
import hashlib
import secrets
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def generate_session_token() -> str:
    return secrets.token_urlsafe(32)

def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Session-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    path_params = event.get('pathParams', {})
    path = path_params.get('action', '') if path_params else ''
    
    try:
        if method == 'POST' and path == 'register':
            return handle_register(event)
        elif method == 'POST' and path == 'login':
            return handle_login(event)
        elif method == 'POST' and path == 'logout':
            return handle_logout(event)
        elif method == 'GET' and path == 'me':
            return handle_get_user(event)
        else:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Not found'}),
                'isBase64Encoded': False
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }

def handle_register(event: dict) -> dict:
    data = json.loads(event.get('body', '{}'))
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    
    if not email or not password:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email и пароль обязательны'}),
            'isBase64Encoded': False
        }
    
    if len(password) < 6:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Пароль должен быть минимум 6 символов'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute('SELECT id FROM users WHERE email = %s', (email,))
            if cur.fetchone():
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Email уже зарегистрирован'}),
                    'isBase64Encoded': False
                }
            
            password_hash = hash_password(password)
            cur.execute(
                'INSERT INTO users (email, password_hash) VALUES (%s, %s) RETURNING id',
                (email, password_hash)
            )
            user_id = cur.fetchone()['id']
            
            session_token = generate_session_token()
            expires_at = datetime.now() + timedelta(days=30)
            cur.execute(
                'INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES (%s, %s, %s)',
                (user_id, session_token, expires_at)
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'X-Set-Cookie': f'session_token={session_token}; Path=/; Max-Age=2592000; SameSite=Lax'
                },
                'body': json.dumps({
                    'success': True,
                    'session_token': session_token,
                    'user': {'id': user_id, 'email': email}
                }),
                'isBase64Encoded': False
            }
    finally:
        conn.close()

def handle_login(event: dict) -> dict:
    data = json.loads(event.get('body', '{}'))
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    
    if not email or not password:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email и пароль обязательны'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            password_hash = hash_password(password)
            cur.execute(
                'SELECT id, email FROM users WHERE email = %s AND password_hash = %s',
                (email, password_hash)
            )
            user = cur.fetchone()
            
            if not user:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный email или пароль'}),
                    'isBase64Encoded': False
                }
            
            session_token = generate_session_token()
            expires_at = datetime.now() + timedelta(days=30)
            cur.execute(
                'INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES (%s, %s, %s)',
                (user['id'], session_token, expires_at)
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'X-Set-Cookie': f'session_token={session_token}; Path=/; Max-Age=2592000; SameSite=Lax'
                },
                'body': json.dumps({
                    'success': True,
                    'session_token': session_token,
                    'user': {'id': user['id'], 'email': user['email']}
                }),
                'isBase64Encoded': False
            }
    finally:
        conn.close()

def handle_logout(event: dict) -> dict:
    headers = event.get('headers', {})
    session_token = headers.get('X-Session-Token') or headers.get('x-session-token')
    
    if not session_token:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Session token required'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute('UPDATE user_sessions SET expires_at = NOW() WHERE session_token = %s', (session_token,))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'X-Set-Cookie': 'session_token=; Path=/; Max-Age=0'
                },
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
    finally:
        conn.close()

def handle_get_user(event: dict) -> dict:
    headers = event.get('headers', {})
    session_token = headers.get('X-Session-Token') or headers.get('x-session-token')
    
    if not session_token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                '''SELECT u.id, u.email, u.messages_today, u.messages_limit, 
                   u.subscription_type, u.subscription_expires_at, u.last_reset_date
                   FROM users u
                   JOIN user_sessions s ON u.id = s.user_id
                   WHERE s.session_token = %s AND s.expires_at > NOW()''',
                (session_token,)
            )
            user = cur.fetchone()
            
            if not user:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invalid or expired session'}),
                    'isBase64Encoded': False
                }
            
            today = datetime.now().date()
            if user['last_reset_date'] != today:
                cur.execute(
                    'UPDATE users SET messages_today = 0, last_reset_date = %s WHERE id = %s',
                    (today, user['id'])
                )
                conn.commit()
                user['messages_today'] = 0
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'id': user['id'],
                    'email': user['email'],
                    'messages_today': user['messages_today'],
                    'messages_limit': user['messages_limit'],
                    'subscription_type': user['subscription_type'],
                    'subscription_expires_at': user['subscription_expires_at'].isoformat() if user['subscription_expires_at'] else None
                }),
                'isBase64Encoded': False
            }
    finally:
        conn.close()