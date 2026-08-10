import * as achievementApi from "../api/achievementApi";

export const achievementService = {

    getStudentAchievements:
        achievementApi.getStudentAchievements,

    getAchievement:
        achievementApi.getAchievement,

    createAchievement:
        achievementApi.createAchievement,

    updateAchievement:
        achievementApi.updateAchievement,

    deactivateAchievement:
        achievementApi.deactivateAchievement,
};