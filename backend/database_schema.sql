-- ============================================
-- 데이터베이스 스키마 생성 스크립트
-- MySQL Workbench 사용 가이드
-- ============================================
-- 
-- [MySQL Workbench 실행 방법]
-- 
-- 방법 1: 데이터베이스가 이미 있는 경우
--   1. MySQL Workbench 실행
--   2. localhost 연결
--   3. 좌측 Schemas에서 'fullstack-3' 데이터베이스 선택 (마우스 우클릭)
--   4. "Set as Default Schema" 선택
--   5. File > Open SQL Script > database_schema.sql 선택
--   6. 번개 아이콘(Execute) 클릭하여 실행
--
-- 방법 2: 데이터베이스 생성부터 하는 경우 (아래 코드 실행)
--   1. MySQL Workbench 실행
--   2. localhost 연결
--   3. 좌측 Schemas에서 아무 데이터베이스나 선택 (또는 아무것도 선택 안 함)
--   4. File > Open SQL Script > database_schema.sql 선택
--   5. 번개 아이콘(Execute) 클릭하여 실행
--      (데이터베이스 생성 + 테이블 생성이 모두 실행됨)
-- ============================================

-- ============================================
-- 1. 데이터베이스 생성 (처음 실행 시에만)
-- ============================================
CREATE DATABASE IF NOT EXISTS `fullstack-3` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 생성된 데이터베이스 사용
USE `fullstack-3`;

-- ============================================
-- 2. 테이블 생성
-- ============================================

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

-- ============================================
-- 3. 인덱스 추가 (선택사항)
-- ============================================
-- 주의: PRIMARY KEY와 FOREIGN KEY는 자동으로 인덱스가 생성됩니다
-- 아래 인덱스는 추가 성능 최적화를 위한 것이며,
-- 이미 존재하는 인덱스는 오류가 발생할 수 있지만 무시해도 됩니다
--
-- MySQL 8.0 이상을 사용하는 경우 아래 주석을 해제하세요
-- CREATE INDEX IF NOT EXISTS `idx_user_UN` ON `user`(`user_UN`);  -- PRIMARY KEY로 이미 인덱스됨
-- CREATE INDEX IF NOT EXISTS `idx_schedule_user` ON `schedule`(`user_UN`);  -- FOREIGN KEY로 이미 인덱스됨
-- CREATE INDEX IF NOT EXISTS `idx_routine_user` ON `routine`(`user_UN`);  -- FOREIGN KEY로 이미 인덱스됨
-- CREATE INDEX IF NOT EXISTS `idx_goal_user` ON `goal`(`user_UN`);  -- FOREIGN KEY로 이미 인덱스됨
-- CREATE INDEX IF NOT EXISTS `idx_diary_user` ON `diary`(`user_UN`);  -- FOREIGN KEY로 이미 인덱스됨
-- CREATE INDEX IF NOT EXISTS `idx_diary_date` ON `diary`(`diary_date`);  -- 이 인덱스만 필요할 수 있음

-- MySQL 5.7 이하를 사용하거나 오류를 피하려면 아래처럼 사용하세요
-- (이미 존재하는 인덱스는 오류가 발생할 수 있지만 무시해도 됩니다)
-- CREATE INDEX `idx_user_UN` ON `user`(`user_UN`);  -- PRIMARY KEY로 이미 인덱스됨 (중복)
-- CREATE INDEX `idx_schedule_user` ON `schedule`(`user_UN`);  -- FOREIGN KEY로 이미 인덱스됨 (중복)
-- CREATE INDEX `idx_routine_user` ON `routine`(`user_UN`);  -- FOREIGN KEY로 이미 인덱스됨 (중복)
-- CREATE INDEX `idx_goal_user` ON `goal`(`user_UN`);  -- FOREIGN KEY로 이미 인덱스됨 (중복)
-- CREATE INDEX `idx_diary_user` ON `diary`(`user_UN`);  -- FOREIGN KEY로 이미 인덱스됨 (중복)
-- CREATE INDEX `idx_diary_date` ON `diary`(`diary_date`);  -- 날짜 검색 최적화를 위한 인덱스

-- ============================================
-- 4. 생성 확인
-- ============================================
-- 아래 쿼리를 실행하여 생성된 테이블을 확인할 수 있습니다
-- SELECT * FROM information_schema.tables WHERE table_schema = 'fullstack-3';
