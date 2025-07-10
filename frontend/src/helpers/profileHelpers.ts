import { ROLES } from "@/constants";

export function isAdmin(roles: string[]) {
    return roles.some(role => [ROLES.ADMIN.toString()].includes(role));
}

export function isBackoffice(roles: string[]) {
    return roles.some(role => [
        ROLES.ADMIN.toString(),
    ].includes(role));
}