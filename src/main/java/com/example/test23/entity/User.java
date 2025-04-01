package com.example.test23.entity;

public class User {

    private Integer user_UN;           // 사용자 고유 번호 (기본 키) - 각 사용자를 고유하게 식별하기 위해 사용
    private String user_name;       // 사용자 이름 - 사용자의 이름을 저장하기 위해 사용
    private String nickname;        // 닉네임 - 사용자의 닉네임을 저장하기 위해 사용
    private String user_id;         // 회원 ID - 사용자가 설정하는 고유한 ID
    private String password;        // 비밀번호 - 사용자의 계정 보안을 위해 사용

    // Getter 및 Setter

    
    public Integer getUser_UN() {
        return user_UN;
    }

    public void setUser_UN(Integer user_UN) {
        this.user_UN = user_UN;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
