export const RISK_LEVELS = {
  CRITICAL: {
    label: '치명적',
    color: 'red',
    icon: 'AlertCircle',
    bgColor: 'bg-red-600',
    textColor: 'text-red-50',
    borderColor: 'border-red-600',
  },
  HIGH: {
    label: '높음',
    color: 'orange',
    icon: 'AlertTriangle',
    bgColor: 'bg-orange-600',
    textColor: 'text-orange-50',
    borderColor: 'border-orange-600',
  },
  MEDIUM: {
    label: '보통',
    color: 'yellow',
    icon: 'AlertCircle',
    bgColor: 'bg-yellow-600',
    textColor: 'text-yellow-50',
    borderColor: 'border-yellow-600',
  },
  LOW: {
    label: '낮음',
    color: 'green',
    icon: 'Info',
    bgColor: 'bg-green-600',
    textColor: 'text-green-50',
    borderColor: 'border-green-600',
  },
  SAFE: {
    label: '안전',
    color: 'blue',
    icon: 'CheckCircle',
    bgColor: 'bg-blue-600',
    textColor: 'text-blue-50',
    borderColor: 'border-blue-600',
  },
};

export const EXAMPLE_QUERIES = [
  {
    id: 1,
    title: '인증 우회 취약점',
    description: 'Python Flask에서 사용자 입력을 직접 쿼리에 삽입',
    code: `from flask import Flask, request
import sqlite3

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    cursor.execute(query)
    user = cursor.fetchone()
    
    if user:
        return "Login successful"
    return "Login failed"`,
    language: 'python',
  },
  {
    id: 2,
    title: 'UNION 공격 취약점',
    description: 'PHP에서 UNION을 이용한 데이터 추출',
    code: `<?php
$id = $_GET['id'];
$conn = mysqli_connect("localhost", "user", "pass", "database");

$query = "SELECT name, email FROM users WHERE id = " . $id;
$result = mysqli_query($conn, $query);

while ($row = mysqli_fetch_assoc($result)) {
    echo $row['name'] . " - " . $row['email'];
}
?>`,
    language: 'php',
  },
  {
    id: 3,
    title: 'ORDER BY 취약점',
    description: 'Node.js에서 동적 정렬 컬럼 처리',
    code: `const express = require('express');
const mysql = require('mysql2');
const app = express();

app.get('/users', (req, res) => {
    const orderBy = req.query.sort || 'id';
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mydb'
    });
    
    const query = \`SELECT * FROM users ORDER BY \${orderBy} ASC\`;
    connection.query(query, (err, results) => {
        res.json(results);
    });
});`,
    language: 'javascript',
  },
];

export const SUPPORTED_FILE_TYPES = ['.txt', '.py', '.php', '.js', '.java', '.sql'];
export const MAX_FILE_SIZE = 1024 * 1024; // 1MB
export const MAX_CODE_LENGTH = 10000;

