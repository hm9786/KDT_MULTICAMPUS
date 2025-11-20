-- 데이터베이스 스키마 생성 스크립트
-- 사용 전 데이터베이스 이름을 확인하고 실행하세요

-- 사용자 테이블
CREATE TABLE IF NOT EXISTS `user` (
    `user_UN` INT AUTO_INCREMENT PRIMARY KEY,
    `user_name` VARCHAR(10) NOT NULL,
    `nickname` VARCHAR(20),
    `user_id` VARCHAR(10) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 프로필 테이블
CREATE TABLE IF NOT EXISTS `profile` (
    `user_UN` INT PRIMARY KEY,
    `nickname` VARCHAR(20),
    `introduce` TEXT,
    `profile_picture` VARCHAR(500),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_UN`) REFERENCES `user`(`user_UN`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 보상 테이블
CREATE TABLE IF NOT EXISTS `reward` (
    `user_UN` INT PRIMARY KEY,
    `points` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_UN`) REFERENCES `user`(`user_UN`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 일정 테이블
CREATE TABLE IF NOT EXISTS `schedule` (
    `schedule_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_UN` INT NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `start_date` DATE NOT NULL,
    `end_date` DATE,
    `start_time` TIME,
    `end_time` TIME,
    `location` VARCHAR(200),
    `latitude` DECIMAL(10, 8),
    `longitude` DECIMAL(11, 8),
    `mode` ENUM('default', 'routine', 'goal', 'diary') DEFAULT 'default',
    `color` VARCHAR(7) DEFAULT '#667eea',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_UN`) REFERENCES `user`(`user_UN`) ON DELETE CASCADE,
    INDEX `idx_user_date` (`user_UN`, `start_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 루틴 테이블
CREATE TABLE IF NOT EXISTS `routine` (
    `routine_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_UN` INT NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `time` TIME,
    `repeat_days` VARCHAR(20) COMMENT '월,화,수,목,금,토,일',
    `repeat_type` ENUM('daily', 'weekly', 'custom') DEFAULT 'daily',
    `routine_type` ENUM('water', 'exercise', 'sleep', 'custom') DEFAULT 'custom',
    `target_value` INT COMMENT '목표 값 (예: 물 8잔)',
    `current_value` INT DEFAULT 0,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_UN`) REFERENCES `user`(`user_UN`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 루틴 실천 기록 테이블
CREATE TABLE IF NOT EXISTS `routine_log` (
    `log_id` INT AUTO_INCREMENT PRIMARY KEY,
    `routine_id` INT NOT NULL,
    `user_UN` INT NOT NULL,
    `log_date` DATE NOT NULL,
    `completed` BOOLEAN DEFAULT FALSE,
    `value` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`routine_id`) REFERENCES `routine`(`routine_id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_UN`) REFERENCES `user`(`user_UN`) ON DELETE CASCADE,
    UNIQUE KEY `unique_routine_date` (`routine_id`, `log_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 목표 테이블
CREATE TABLE IF NOT EXISTS `goal` (
    `goal_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_UN` INT NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `target_date` DATE NOT NULL,
    `color` VARCHAR(7) DEFAULT '#667eea',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_UN`) REFERENCES `user`(`user_UN`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 목표 작업 테이블
CREATE TABLE IF NOT EXISTS `goal_task` (
    `task_id` INT AUTO_INCREMENT PRIMARY KEY,
    `goal_id` INT NOT NULL,
    `task_name` VARCHAR(200) NOT NULL,
    `task_date` DATE NOT NULL,
    `completed` BOOLEAN DEFAULT FALSE,
    `total_time` INT DEFAULT 0 COMMENT '누적 시간 (분)',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`goal_id`) REFERENCES `goal`(`goal_id`) ON DELETE CASCADE,
    INDEX `idx_goal_date` (`goal_id`, `task_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 다이어리 테이블
CREATE TABLE IF NOT EXISTS `diary` (
    `diary_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_UN` INT NOT NULL,
    `diary_date` DATE NOT NULL,
    `weather` VARCHAR(50),
    `temperature` DECIMAL(5, 2),
    `today_goal` VARCHAR(100),
    `content` TEXT,
    `star_rating` INT DEFAULT 0 COMMENT '0-5점',
    `image_url` VARCHAR(500),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_UN`) REFERENCES `user`(`user_UN`) ON DELETE CASCADE,
    UNIQUE KEY `unique_user_date` (`user_UN`, `diary_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 인덱스 추가
CREATE INDEX `idx_user_UN` ON `user`(`user_UN`);
CREATE INDEX `idx_schedule_user` ON `schedule`(`user_UN`);
CREATE INDEX `idx_routine_user` ON `routine`(`user_UN`);
CREATE INDEX `idx_goal_user` ON `goal`(`user_UN`);
CREATE INDEX `idx_diary_user` ON `diary`(`user_UN`);
CREATE INDEX `idx_diary_date` ON `diary`(`diary_date`);

