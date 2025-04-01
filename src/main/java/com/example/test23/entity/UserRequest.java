package com.example.test23.entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

    private Integer userUN; // 고유 아이디 번호
    private String userName; // 이름
    private String password; // 비밀번호
    private String nickname; // 닉네임
    private String userId; // 회원 ID
}
