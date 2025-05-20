FROM node:18

# 전체 프로젝트 복사할 루트 작업 폴더
WORKDIR /app

# package.json 등 의존성 관련 파일 복사 (루트 기준)
COPY package*.json ./
COPY tsconfig*.json ./
COPY ../../libs ./libs 
RUN npm install
COPY . .

# auth-server 작업 디렉토리로 이동
WORKDIR /app/apps/auth-server

# auth-server 빌드
RUN npm run build

# 앱 실행 (빌드된 js 파일 경로)
CMD ["node", "dist/apps/auth-server/src/main.j"]

# 노출 포트
EXPOSE 3001
