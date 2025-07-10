import { BaseFilter } from "./BaseFilter";

export type UserFilter = BaseFilter & {
    email: string;
};

