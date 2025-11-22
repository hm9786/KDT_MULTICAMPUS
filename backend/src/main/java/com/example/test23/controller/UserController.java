package com.example.test23.controller;

import com.example.test23.entity.User;
import com.example.test23.entity.UserLoginRequest;
import com.example.test23.entity.UserResponse;
import com.example.test23.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Collections;

@RestController
@RequestMapping("/api/users") // API 엔드포인트
public class UserController {

    @Autowired // 의존성을 주입
    private UserService userService;

    // 회원가입 엔드포인트
    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            // 중복된 user_id가 있는지 확인
            if (userService.checkUserIdExists(user.getUser_id())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User ID가 이미 존재합니다.");
            }

            // 사용자 정보 저장 (insertUser 후 user_UN이 자동으로 설정됨)
            User newUser = userService.saveUser(user);
            
            // 응답 생성 및 반환 (user_UN 반환)
            if (newUser.getUser_UN() != null) {
                return ResponseEntity.ok(Collections.singletonMap("user_UN", newUser.getUser_UN()));
            } else {
                // user_UN이 없으면 다시 조회 시도
                User savedUser = userService.getUserByUserId(newUser.getUser_id());
                if (savedUser != null && savedUser.getUser_UN() != null) {
                    return ResponseEntity.ok(Collections.singletonMap("user_UN", savedUser.getUser_UN()));
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("사용자 생성 후 ID를 가져오는데 실패했습니다.");
                }
            }
        } catch (Exception e) {
            e.printStackTrace(); // 서버 콘솔에 오류 출력
            String errorMessage = "회원가입 중 오류가 발생하였습니다: " + e.getMessage();
            if (e.getCause() != null) {
                errorMessage += " (원인: " + e.getCause().getMessage() + ")";
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    // 회원 ID로 사용자 정보 조회
    @GetMapping("/userId/{userId}")
    public ResponseEntity<?> getUserByUserId(@PathVariable String userId) {
        try {
            User user = userService.getUserByUserId(userId);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
            }
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("사용자 조회 중 오류가 발생하였습니다.");
        }
    }

    // 사용자 정보 업데이트
    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Integer userId, @RequestBody User user) {
        try {
            user.setUser_UN(userId); // 업데이트할 사용자 ID 설정
            userService.updateUser(user);
            return ResponseEntity.ok("사용자 정보가 업데이트되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("사용자 업데이트 중 오류가 발생하였습니다.");
        }
    }

    // 사용자 정보 삭제
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok("사용자 ID " + userId + "이(가) 삭제되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("사용자 삭제 중 오류가 발생하였습니다.");
        }
    }

    // 회원 ID 중복 확인
    @PostMapping("/checkUserId")
    public ResponseEntity<Map<String, Boolean>> checkUserId(@RequestBody Map<String, String> request) {
        try {
            String user_id = request.get("user_id");
            if (user_id == null || user_id.trim().isEmpty()) {
                return ResponseEntity.ok(Collections.singletonMap("exists", false));
            }
            boolean exists = userService.checkUserIdExists(user_id);
            return ResponseEntity.ok(Collections.singletonMap("exists", exists));
        } catch (Exception e) {
            e.printStackTrace(); // 서버 콘솔에 오류 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("exists", false));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody UserLoginRequest loginRequest, HttpServletRequest request) {
        UserResponse userResponse = userService.login(loginRequest);
        
        // 로그인 성공 시
        if (userResponse.getMessage().equals("로그인 성공")) {
            // 세션에 사용자 정보 저장
            HttpSession session = request.getSession();
            session.setAttribute("userUN", userResponse.getUserUN()); // 사용자 ID 저장
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        } 
        // 로그인 실패 시
        else {
            return new ResponseEntity<>(userResponse, HttpStatus.UNAUTHORIZED);
        }
    }
    
    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // 현재 세션 가져오기
        if (session != null) {
            session.invalidate(); // 세션 무효화
        }
        return new ResponseEntity<>("로그아웃 성공", HttpStatus.OK);
    }

    // 현재 사용자 정보 조회(필요하면)
    @GetMapping("/current")
    public ResponseEntity<UserResponse> getCurrentUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // 현재 세션 가져오기
        if (session != null && session.getAttribute("userUN") != null) {
            Integer userUN = (Integer) session.getAttribute("userUN"); // Integer로 캐스팅
            UserResponse userResponse = new UserResponse();
            userResponse.setUserUN(userUN); // Integer 타입
            return ResponseEntity.ok(userResponse);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // 로그인하지 않았을 때
    }

    // 비밀번호 확인
    @PostMapping("/check-password")
    public ResponseEntity<Map<String, Boolean>> checkPassword(@RequestBody Map<String, String> request) {
        try {
            String userId = request.get("userId");
            String password = request.get("password");
            
            if (userId == null || password == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("success", false));
            }
            
            boolean isValid = userService.checkPassword(userId, password);
            return ResponseEntity.ok(Collections.singletonMap("success", isValid));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("success", false));
        }
    }

    // 비밀번호 변경
    @PostMapping("/change-password")
    public ResponseEntity<Map<String, Boolean>> changePassword(@RequestBody Map<String, String> request) {
        try {
            String userId = request.get("userId");
            String newPassword = request.get("password");
            
            if (userId == null || newPassword == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("success", false));
            }
            
            boolean success = userService.changePassword(userId, newPassword);
            return ResponseEntity.ok(Collections.singletonMap("success", success));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("success", false));
        }
    }

    // 계정 삭제
    @DeleteMapping("/delete-account")
    public ResponseEntity<Map<String, Boolean>> deleteAccount(@RequestBody Map<String, String> request) {
        try {
            String userId = request.get("userId");
            String password = request.get("password");
            
            if (userId == null || password == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("success", false));
            }
            
            boolean success = userService.deleteAccount(userId, password);
            return ResponseEntity.ok(Collections.singletonMap("success", success));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("success", false));
        }
    }
    
}