로컬 PC에서 수정된 내용을 사전에 확인(미리보기)하는 방법입니다.

1. 🌐 지금 바로 확인하기 (개발 서버 동작 중)
방금 제가 로컬 개발 서버를 켜두었습니다! 인터넷 브라우저(크롬, 엣지 등)를 열고 주소창에 아래 주소를 입력하여 접속하시면 수정된 스케줄 달력을 바로 확인하실 수 있습니다:

👉 http://localhost:3000

2. 💻 나중에 직접 로컬 서버 실행하는 방법 (VS Code 기준)
나중에 코드를 추가로 수정하거나 다시 미리보고 싶으실 때는 아래 순서대로 실행하시면 됩니다.

VS Code에서 터미널 열기

단축키: Ctrl + ` (숫자 1 왼쪽의 물결표 키)
또는 상단 메뉴의 터미널(Terminal) ➔ 새 터미널(New Terminal) 클릭
개발 서버 실행 명령어 입력

bash
npm run dev
입력 후 Enter를 치면 아래처럼 준비 완료 메시지가 뜹니다:

text
- Local: http://localhost:3000
웹 브라우저 접속

브라우저 주소창에 http://localhost:3000 입력 후 접속하여 확인합니다.
테스트 종료하기

터미널 창을 클릭한 뒤 Ctrl + C 키를 누르면 개발 서버가 종료됩니다.
확인해보시면서 수정이 필요한 부분이 있다면 언제든 말씀해 주세요!



웹사이트 상에서 휴진일 및 진료 일정을 직접 입력·수정할 수 있는 팝업(모달) 기능을 추가했습니다!

이제 복잡한 코드 수정 없이 웹 화면에서 바로 클릭 몇 번으로 휴진일을 등록/수정/삭제하실 수 있습니다.

📱 웹에서 휴진 일정 입력/수정하는 방법
http://localhost:3000 접속하기

브라우저를 열고 웹사이트에 접속합니다.
일정 수정 모달 열기

달력 우측 상단의 ✏️ 휴진 등록 버튼을 클릭하거나,
달력에서 원하시는 날짜를 클릭한 뒤 하단의 ✏️ 이 날짜 휴진/일정 수정 버튼을 누릅니다.
내용 입력하기

날짜: 변경할 날짜 선택
진료 구별: 🔴 휴진, 🟡 목오후진료, 🟢 토요일진료, 🔵 정상진료 중 선택
사유 입력: 예) 여름 휴가, 추석 연휴, 원장님 세미나 휴진 등 사유 작성
💾 웹 화면에 즉시 저장 버튼 클릭!

클릭 즉시 달력에 🔴 휴진 뱃지가 생성되며 화면에 실시간 반영됩니다.
등록하신 일정은 브라우저(로컬 스토리지)에 저장되어 새로고침을 해도 그대로 유지됩니다.
🌐 작성한 휴진 일정을 GitHub / Vercel(실제 인터넷 웹사이트)에 영구 반영하는 방법
웹 화면에서 일정을 여러 개 등록하신 후, 전 세계 모든 방문자(환자들)에게 영구적으로 보이고 싶으실 때 사용하시면 됩니다.

✏️ 휴진 등록 팝업창 하단의 📋 GitHub/서버 영구 반영용 코드 복사 버튼을 클릭합니다.
클립보드에 자동 복사된 코드를 

src/components/MonthlyCalendar.tsx
 파일 11번째 줄의 DEFAULT_SPECIAL_SCHEDULES = { ... } 부분에 붙여넣습니다.
터미널에서 GitHub로 전송(Push)합니다:
bash
git add .
git commit -m "Update hospital holiday schedules"
git push origin main
지금 바로 http://localhost:3000에서 ✏️ 휴진 등록 버튼을 눌러 테스트해 보세요!




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
