# event-reward-platform

1. 소스 코드 클론

- git clone [<레포지토리 주소>](https://github.com/jenkwon92/event-reward-platform.git)
  cd event-reward-platform

2. 도커 이미지 빌드 및 컨테이너 실행

- docker-compose up --build

3. 서비스 접속 확인

- 게이트웨이 서버 (API 프록시): http://localhost:3000
- Auth 서버: http://localhost:3001
- Event 서버: http://localhost:3002

4. 컨테이너 중지 및 제거

- docker-compose down
