import http from "axios";
import {AuthService} from "./services/AuthService";

http.defaults.baseURL = `http://localhost:9090`;
http.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
        return config;
    }
);

let refresh = false;
http.interceptors.response.use(resp => resp, async error => {
    console.log('error interceptors', error)
    if ((!refresh && error.response) && (error.response.status === 401 || error.response.status === 403)) {
        refresh = true;
        try {
            const res = await AuthService.refreshToken(localStorage.getItem('refreshToken'));
            console.log('response: ', res);
            if (res.data.success) {
                localStorage.setItem("accessToken", res.data.data.accessToken);
                localStorage.setItem("refreshToken", res.data.data.refreshToken);
                window.location.reload();
            } else {
                window.location.href = '/login';
            }
        } catch (err) {
            console.log('error: ', err)
            window.location.href = '/login';
        }
    }
    refresh = true;
    return error.config;
});

export default http;