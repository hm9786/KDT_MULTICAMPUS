package com.example.test23.service;

import com.example.test23.entity.Reward;
import com.example.test23.mappers.RewardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RewardService {

    @Autowired
    private RewardMapper rewardMapper;

    public Reward getRewardByUserId(Integer user_UN) {
        Reward reward = rewardMapper.getRewardByUserId(user_UN);
        if (reward == null) {
            // 리워드가 없으면 생성
            rewardMapper.insertReward(user_UN, 0);
            reward = new Reward();
            reward.setUser_UN(user_UN);
            reward.setPoints(0);
        }
        return reward;
    }

    public void updateRewardPoints(Integer user_UN, Integer points) {
        Reward existingReward = rewardMapper.getRewardByUserId(user_UN);
        if (existingReward == null) {
            rewardMapper.insertReward(user_UN, points);
        } else {
            rewardMapper.updateRewardPoints(user_UN, points);
        }
    }
}

