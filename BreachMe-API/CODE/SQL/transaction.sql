DROP TABLE transactions;
--@BLOCK
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  amount VARCHAR(255) NOT NULL,
  type ENUM('income', 'withdrawal'),
  user_id INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
--@block
SELECT * FROM transactions;