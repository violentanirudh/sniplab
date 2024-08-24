import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    thresholds: {
        http_req_failed: ["rate<0.03"], // http errors should be less than 1%
        http_req_duration: ["p(95)<500"], // 95% of requests should be below 200ms
    },
    stages: [
        { duration: "10s", target: 10 },
        { duration: "30s", target: 50 },
        { duration: "20s", target: 0 },
    ],
};

export default function () {
    const res = http.get("http://localhost:4000/api/snips");
    check(res, { "status was 200": (r) => r.status == 200 });
}
