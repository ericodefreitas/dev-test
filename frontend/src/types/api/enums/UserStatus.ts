export enum UserStatus {
    CONFIRMED = 0,
    PENDING_INFORMATION = 1,
    FORCE_CHANGE_PASSWORD = 2,
    BLOCKED = 3
}

export function getBadgeColorByUserStatus(value: UserStatus) {
    switch (value) {
        case UserStatus.CONFIRMED:
            return "success";
        case UserStatus.PENDING_INFORMATION:
            return "warning";
        case UserStatus.FORCE_CHANGE_PASSWORD:
            return "info";
        case UserStatus.BLOCKED:
            return "danger";
    }
}


