package com.example.test23.controller;

import com.example.test23.entity.Profile;
import com.example.test23.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/{userId}/profile")
    public ResponseEntity<?> getUserProfile(@PathVariable Integer userId) {
        try {
            Profile profile = profileService.getProfileByUserId(userId);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("프로필 조회 중 오류가 발생하였습니다.");
        }
    }

    @PutMapping("/{userId}/nickname")
    public ResponseEntity<?> updateNickname(@PathVariable Integer userId, @RequestBody Map<String, String> request) {
        try {
            String nickname = request.get("nickname");
            if (nickname == null || nickname.trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("닉네임을 입력해주세요.");
            }
            profileService.updateNickname(userId, nickname);
            return ResponseEntity.ok("닉네임이 업데이트되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("닉네임 업데이트 중 오류가 발생하였습니다.");
        }
    }

    @PutMapping("/{userId}/introduce")
    public ResponseEntity<?> updateIntroduce(@PathVariable Integer userId, @RequestBody Map<String, String> request) {
        try {
            String introduce = request.get("introduce");
            if (introduce == null) {
                introduce = "";
            }
            profileService.updateIntroduce(userId, introduce);
            return ResponseEntity.ok("자기소개가 업데이트되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자기소개 업데이트 중 오류가 발생하였습니다.");
        }
    }

    // 프로필 이미지 업로드
    @PostMapping("/{userId}/profile-image")
    public ResponseEntity<?> uploadProfileImage(
            @PathVariable Integer userId,
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("파일이 비어있습니다.");
            }

            // FileUploadController의 로직 재사용
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            if (!extension.matches("\\.(jpg|jpeg|png|gif|webp)$")) {
                return ResponseEntity.badRequest().body("이미지 파일만 업로드 가능합니다.");
            }

            // 파일 업로드 처리 (FileUploadController와 동일한 로직)
            java.nio.file.Path uploadPath = java.nio.file.Paths.get("uploads");
            if (!java.nio.file.Files.exists(uploadPath)) {
                java.nio.file.Files.createDirectories(uploadPath);
            }

            String filename = java.util.UUID.randomUUID().toString() + extension;
            java.nio.file.Path filePath = uploadPath.resolve(filename);
            java.nio.file.Files.copy(file.getInputStream(), filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = "/uploads/" + filename;
            
            // 프로필에 이미지 URL 저장
            profileService.updateProfilePicture(userId, imageUrl);
            
            return ResponseEntity.ok(Map.of("imageUrl", imageUrl, "message", "프로필 이미지가 업데이트되었습니다."));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("프로필 이미지 업로드 중 오류가 발생하였습니다.");
        }
    }
}

