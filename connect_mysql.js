const mysql = require('mysql2');

// สร้างการเชื่อมต่อ
const connection = mysql.createConnection({
    host: '210.246.200.99',     // Host ของฐานข้อมูล Ruk-Com
    user: 'worldmax_DB',      // ชื่อผู้ใช้ฐานข้อมูล
    password: 'KsEaTg8bFCRS94gu6TPv',  // รหัสผ่านของฐานข้อมูล
    database: 'worldmax_DB',  // ชื่อฐานข้อมูล
    port: 3306,                 // พอร์ต (ค่าเริ่มต้นของ MySQL)
});

// ทดสอบการเชื่อมต่อ
connection.connect((err) => {
    if (err) {
        console.error('การเชื่อมต่อล้มเหลว:', err.message);
    
        return;
    }
    console.log('เชื่อมต่อฐานข้อมูลสำเร็จ!');
});

// ดึงข้อมูลจากฐานข้อมูล
const query = 'SELECT * FROM Book'; // แก้ไข 'your_table_name' เป็นชื่อจริง

connection.query(query, (err, results) => {
    if (err) {
        console.error('ข้อผิดพลาดในการดึงข้อมูล:', err.message);
        return;
    }
    console.log('ผลลัพธ์:', results);
});

// ปิดการเชื่อมต่อเมื่อเสร็จสิ้น
connection.end();
