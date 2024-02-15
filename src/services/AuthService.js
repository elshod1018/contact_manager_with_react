import axios from "axios";

axios.defaults.baseURL = `http://localhost:9090`;

export class AuthService {
    static authUrl = `/api/v1/auth`;

    static register(userCreateDTO) {
        return axios.post(`${this.authUrl}/user/register`, userCreateDTO);
    }

    static login(tokenRequest) {
        return axios.post(`${this.authUrl}/token/access`, tokenRequest);
    }

    static async activateUser(activationData) {
        return axios.put(`${this.authUrl}/user/activate`, activationData);
    }

    static async refreshToken(refreshToken) {
        return axios.post(`${this.authUrl}/token/refresh`, {"refreshToken": refreshToken});
    }

    static async validateToken(token) {
        return axios.post(`${this.authUrl}/token/validate`, {"token": token});
    }
}