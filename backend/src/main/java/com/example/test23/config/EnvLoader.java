package com.example.test23.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.nio.file.Paths;

@Configuration
public class EnvLoader {

    @PostConstruct
    public void loadEnv() {
        // 프로젝트 루트 디렉토리의 .env 파일 로드
        // 현재 작업 디렉토리 (실행되는 위치)
        String currentDir = System.getProperty("user.dir");
        String projectRoot = currentDir;
        
        // 현재 디렉토리가 backend인 경우 상위 디렉토리로 이동
        String dirName = Paths.get(currentDir).getFileName().toString();
        if ("backend".equals(dirName)) {
            projectRoot = Paths.get(currentDir).getParent().toString();
        }
        
        // .env 파일 경로 확인
        String envPath = Paths.get(projectRoot, ".env").toString();
        
        // 프로젝트 루트에서 .env 파일 찾기
        try {
            Dotenv dotenv = Dotenv.configure()
                    .directory(projectRoot)
                    .ignoreIfMissing()
                    .load();
            
            // 환경 변수가 로드되었는지 확인
            if (dotenv.entries().isEmpty()) {
                System.out.println(".env 파일을 찾을 수 없습니다. (파일이 비어있거나 없습니다)");
                System.out.println("찾은 경로: " + envPath);
                return;
            }
            
            // 환경 변수를 시스템 프로퍼티로 설정하여 Spring Boot가 읽을 수 있게 함
            int count = 0;
            for (var entry : dotenv.entries()) {
                System.setProperty(entry.getKey(), entry.getValue());
                count++;
            }
            
            System.out.println(".env 파일 로드 완료: " + envPath);
            System.out.println("로드된 환경 변수 개수: " + count);
        } catch (Exception e) {
            // .env 파일이 없어도 계속 진행 (시스템 환경 변수 사용)
            System.out.println(".env 파일을 찾을 수 없습니다. 시스템 환경 변수를 사용합니다.");
            System.out.println("현재 디렉토리: " + currentDir);
            System.out.println("프로젝트 루트: " + projectRoot);
            System.out.println(".env 파일 경로: " + envPath);
            System.out.println("오류: " + e.getMessage());
        }
    }
}

