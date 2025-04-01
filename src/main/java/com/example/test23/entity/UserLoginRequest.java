package com.example.test23.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginRequest {
    private String userId; // 회원 ID
    private String password; // 비밀번호
}
