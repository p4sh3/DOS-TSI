import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '15s', target: 500 }, // 0s - 15s 500
    { duration: '30s', target: 1000 }, // 15s - 30s 1000
    { duration: '1m', target: 3000 },
    { duration: '20s', target: 6000 }, 
    { duration: '0s', target: 0 }, 
  ],
};

function login() {
  const url = 'http://localhost:3000/api/login';
  const payload = JSON.stringify({
    username: 'user',
    password: 'password',
  });
  
  // HTTP
  const params = {
    headers: {
      'Content-Type': 'application/json', // mime type
    },
    timeout: '60s',
  };

  return http.post(url, payload, params);
}

export default function () {


  const loginRes = login();

  const success = check(loginRes, { 'status is 200': (r) => loginRes.status === 200 });
  errorRate.add(!success);
  sleep(1);

}
