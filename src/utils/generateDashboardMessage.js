export function generateDashboardMessage(
    profile,
    scholarships
) {
    if (!profile?.name) {
        return "Complete your student profile to receive personalized scholarship recommendations.";
    }

    // Total scholarship amount tracked
    const totalAmount = scholarships.reduce(
        (sum, s) => sum + Number(s.amount || 0),
        0
    );

    //Major-specific advice
    let majorAdvice = "";

    const major = profile.major?.toLowerCase();

    if (major?.includes("computer")) {
        majorAdvice =
            "As a Computer Science student, prioritize STEM and technology scholarships.";
    }
    else if (major?.includes("engineering")) {
        majorAdvice =
            "Engineering scholarships often have early deadlines, so apply as soon as possible.";
    }
    else if (major?.includes("business")) {
        majorAdvice =
            "Business students should target leadership and entrepreneurship scholarships.";
    }
    else if (major?.includes("medical") || major?.includes("nursing")) {
        majorAdvice =
            "Healthcare scholarships frequently require service and volunteer experience.";
    }
    else {
        majorAdvice =
            "Continue searching for scholarships specific to your field of study.";
    }

    // Funding goal 
    const goal = Number(profile.scholarshipGoal || 0);

    // Recommendations
    let recommendedCategories = [];
    if (major?.includes("computer")) {
        recommendedCategories = [
            "STEM",
            "Technology",
            "Research",
            "Women in Tech"
        ];
    }
    else if (major?.includes("engineering")) {
        recommendedCategories = [
            "Engineering",
            "STEM",
            "Research"
        ];
    }
    else if (major?.includes("business")) {
        recommendedCategories = [
            "Leadership",
            "Business",
            "Entrepreneurship"
        ];
    }

    // Final message
    return {
        greeting: `Welcome back, ${profile.name}!`,
        majorAdvice,
        totalAmount,
        goal,
        recommendedCategories
    };
}