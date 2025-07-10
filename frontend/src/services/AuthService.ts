import { BaseService } from "@/services/BaseService";
import { UserProfile } from "@/types/api/enums/UserProfile";

export type LoginResponse = {
    token: string,
    user?: {
        username: string,
        profile: UserProfile
    }
    errorMessage?: string,
}

class AuthService extends BaseService {
    constructor() {
        super("");
    }

    async login(username: string, password: string): Promise<LoginResponse> {
        const response = await this._axios.post(`${this._controller}/login`, { username, password });
        return response.data;
    }
}

export default new AuthService();