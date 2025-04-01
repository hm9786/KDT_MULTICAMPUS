package com.example.test23.mappers;

import com.example.test23.entity.User;
import com.example.test23.entity.UserRequest;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper  
public interface UserMapper {
    public void insertUser(User user);                                         // 사용자 정보 삽입 메서드
    public User selectUserByUserId(@Param("user_id") String user_id);          // 회원 ID로 사용자 정보 조회 메서드
    public void updateUser(User user);                                         // 사용자 정보 업데이트 메서드
    public void deleteUserById(@Param("user_UN") Long user_UN);                // 사용자 ID로 사용자 정보 삭제 메서드
    public int existsByUserId(@Param("user_id") String userId);                // 회원 ID 중복 확인 메서드 추가
    UserRequest findByUserId(String userId);                             // 사용자 ID로 사용자 조회(로그인)
}

