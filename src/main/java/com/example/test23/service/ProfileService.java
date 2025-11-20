package com.example.test23.service;

import com.example.test23.entity.Profile;
import com.example.test23.mappers.ProfileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    private ProfileMapper profileMapper;

    public Profile getProfileByUserId(Integer user_UN) {
        Profile profile = profileMapper.getProfileByUserId(user_UN);
        if (profile == null) {
            // 프로필이 없으면 생성
            profileMapper.insertProfile(user_UN);
            profile = new Profile();
            profile.setUser_UN(user_UN);
            profile.setNickname("");
            profile.setIntroduce("");
        }
        return profile;
    }

    public void updateNickname(Integer user_UN, String nickname) {
        Profile profile = profileMapper.getProfileByUserId(user_UN);
        if (profile == null) {
            profileMapper.insertProfile(user_UN);
        }
        profileMapper.updateNickname(user_UN, nickname);
    }

    public void updateIntroduce(Integer user_UN, String introduce) {
        Profile profile = profileMapper.getProfileByUserId(user_UN);
        if (profile == null) {
            profileMapper.insertProfile(user_UN);
        }
        profileMapper.updateIntroduce(user_UN, introduce);
    }

    public void updateProfilePicture(Integer user_UN, String imageUrl) {
        Profile profile = profileMapper.getProfileByUserId(user_UN);
        if (profile == null) {
            profileMapper.insertProfile(user_UN);
        }
        profileMapper.updateProfilePicture(user_UN, imageUrl);
    }
}

