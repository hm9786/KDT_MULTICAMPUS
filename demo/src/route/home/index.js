"use strict";

const express = require("express");
const router = express.Router();

// 메인 페이지
router.get("/", (req, res) => {
    try {
        res.render("home/index");
    } catch (err) {
        res.status(500).send("서버 오류가 발생했습니다.");
    }
});

// 로그인 페이지 (GET 요청)
router.get("/login", (req, res) => {
    try {
        res.render("home/login");
    } catch (err) {
        res.status(500).send("서버 오류가 발생했습니다.");
    }
});

// 로그인 처리 (POST 요청)
router.post("/login", (req, res) => {
    const { user_id, password } = req.body; // 폼 데이터를 받아오기
    // 로그인 로직 처리 
    if (user_id === "admin" && password === "1234") {// 예시-임시 작성 추후 변경예정
        res.send("로그인 성공");
    } else {
        res.status(401).send("로그인 실패: 잘못된 사용자 정보입니다.");
    }
    // 임시작성
});

// 회원가입 페이지 (추가 라우트)
router.get("/signup", (req, res) => {
    try {
        res.render("home/signup");
    } catch (err) {
        res.status(500).send("서버 오류가 발생했습니다.");
    }
});

// 회원가입 처리 (POST 요청)
router.post("/signup", (req, res) => {
    const { user_name, user_id, password } = req.body;
    if (!user_name || !user_id || !password) {
        return res.status(400).send("모든 필드를 입력해주세요.");
    }

    // 회원가입 로직 추가
    res.send("회원가입 성공");
});

module.exports = router;
