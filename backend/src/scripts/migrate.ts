import pool from "../config/db.js";

async function migrate() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        status ENUM('todo', 'in-progress', 'done') DEFAULT 'todo',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        description TEXT,
        assignee VARCHAR(255),
        priority ENUM('low', 'medium', 'high') DEFAULT 'medium'
      );
    `);

    console.log('Migration completed');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();