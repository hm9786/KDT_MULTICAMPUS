package com.example.test23.service;

import com.example.test23.entity.User;
import com.example.test23.entity.UserLoginRequest;
import com.example.test23.entity.UserRequest;
import com.example.test23.entity.UserResponse;
import com.example.test23.mappers.UserMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder; // PasswordEncoder 주입
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder; // PasswordEncoder 주입

    private int loginAttempts = 0; // 로그인 시도 횟수
    private static final int MAX_LOGIN_ATTEMPTS = 5; // 최대 로그인 시도 횟수

    public boolean checkUserIdExists(String userId) {
        return userMapper.existsByUserId(userId) > 0; // 중복된 사용자 ID가 존재하면 true 반환
    }

    public User saveUser(User user) {
        // 비밀번호 암호화
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userMapper.insertUser(user); // 사용자 정보 저장
        return user;
    }

    public User getUserByUserId(String user_id) {
        return userMapper.selectUserByUserId(user_id); // 회원 ID로 사용자 정보 조회
    }

    public void updateUser(User user) {
        // 비밀번호를 업데이트할 경우 암호화 필요
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userMapper.updateUser(user); // 사용자 정보 업데이트
    }

    public void deleteUser(Long user_UN) {
        userMapper.deleteUserById(user_UN); // 사용자 정보 삭제
    }

    public UserResponse login(UserLoginRequest loginRequest) {
        // 로그인 시도 제한 체크
        if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            UserResponse response = new UserResponse();
            response.setMessage("로그인 시도가 너무 많습니다. 나중에 다시 시도해 주세요.");
            return response;
        }

        UserRequest user;
        try {
            user = userMapper.findByUserId(loginRequest.getUserId());
        } catch (Exception e) {
            UserResponse response = new UserResponse();
            response.setMessage("사용자 조회 중 오류가 발생했습니다.");
            return response;
        }

        UserResponse response = new UserResponse();
        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            response.setMessage("로그인 성공");
            response.setUserUN(user.getUserUN()); // 고유 ID 반환

            // 세션에 사용자 정보 저장
            UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
            SecurityContextHolder.getContext().setAuthentication(authentication);
 
            // 로그인 시도 횟수 초기화
            loginAttempts = 0;
        } else {
            loginAttempts++;
            response.setMessage("아이디 또는 비밀번호가 틀립니다.");
        }
        return response;
    }
}
