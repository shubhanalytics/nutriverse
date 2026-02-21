CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  mobile VARCHAR(13) NOT NULL UNIQUE,
  address VARCHAR(255) NOT NULL,
  pincode CHAR(6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS otp_codes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  mobile VARCHAR(13) NOT NULL,
  otp CHAR(6) NOT NULL,
  purpose ENUM('signup','login') NOT NULL,
  payload_json JSON NULL,
  is_used TINYINT(1) DEFAULT 0,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_mobile_purpose (mobile, purpose),
  INDEX idx_expires (expires_at)
);
