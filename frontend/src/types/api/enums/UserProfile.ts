export enum UserProfile {
    Administrator = 1,
}

export function getBadgeColorByUserProfile(value: string) {
    switch (value) {
        case UserProfile[UserProfile.Administrator]:
            return "dark";
    }
}

export function userProfileOptions() {
    return [
        { id: UserProfile.Administrator, name: "Administrador" },
    ]
}