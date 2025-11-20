package com.example.test23.mappers;

import com.example.test23.entity.Reward;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface RewardMapper {
    Reward getRewardByUserId(@Param("user_UN") Integer user_UN);
    void updateRewardPoints(@Param("user_UN") Integer user_UN, @Param("points") Integer points);
    void insertReward(@Param("user_UN") Integer user_UN, @Param("points") Integer points);
}

