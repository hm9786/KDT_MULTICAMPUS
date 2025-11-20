package com.example.test23.mappers;

import com.example.test23.entity.Profile;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ProfileMapper {
    Profile getProfileByUserId(@Param("user_UN") Integer user_UN);
    void updateNickname(@Param("user_UN") Integer user_UN, @Param("nickname") String nickname);
    void updateIntroduce(@Param("user_UN") Integer user_UN, @Param("introduce") String introduce);
    void updateProfilePicture(@Param("user_UN") Integer user_UN, @Param("profilePicture") String profilePicture);
    void insertProfile(@Param("user_UN") Integer user_UN);
}

