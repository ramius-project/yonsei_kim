export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 pb-20">
      
      {/* 1. 상단 헤더 */}
      <header className="w-full fixed top-0 bg-white/90 backdrop-blur-sm shadow-sm z-10 px-6 py-4 flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-xl font-bold text-blue-800 flex items-center gap-2">
          🦷 연세김치과의원
        </h1>
        <nav className="hidden md:flex space-x-8 text-gray-600 font-medium text-sm">
          <a href="#about" className="hover:text-blue-600 transition">병원소개</a>
          <a href="#services" className="hover:text-blue-600 transition">진료과목</a>
          <a href="#hours" className="hover:text-blue-600 transition">진료시간</a>
          <a href="#location" className="hover:text-blue-600 transition">오시는길</a>
        </nav>
        <a href="tel:032-461-2875" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition shadow-md">
          📞 032-461-2875
        </a>
      </header>

      {/* 2. 히어로 섹션 */}
      <section className="mt-24 w-full max-w-5xl px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-1/2 space-y-6">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            과잉진료 없는 양심 치과
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            가족처럼 편안하게,<br/>
            <span className="text-blue-600">내 치아처럼 소중하게.</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            36년 경력의 전문의가 직접 진료합니다.<br/>
            최신 장비를 갖춘 깨끗한 환경에서 안심하고 진료받으세요.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="tel:032-461-2875" className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 text-center">
              전화로 예약하기
            </a>
            <a href="#services" className="border border-blue-200 bg-white text-blue-600 px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition text-center">
              진료과목 보기
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="w-72 h-72 md:w-80 md:h-80 bg-gradient-to-tr from-blue-100 to-teal-50 rounded-[2rem] flex items-center justify-center text-8xl shadow-inner border-4 border-white rotate-3">
            
          </div>
        </div>
      </section>

      {/* 3. 진료 과목 */}
      <section id="services" className="w-full max-w-5xl px-6 py-12">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">주요 진료 과목</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: '🦷', title: '일반진료', desc: '충치치료, 스케일링' },
            { icon: '✨', title: '심미보철', desc: '라미네이트, 올세라믹' },
            { icon: '🔩', title: '임플란트', desc: '디지털 정밀 임플란트' },
            { icon: '😁', title: '노인보철', desc: '보험틀니, 보험임플란트' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center border border-gray-100">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
              <p className="text-xs md:text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 진료 시간 안내 */}
      <section id="hours" className="w-full max-w-5xl px-6 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            🕒 진료 시간 안내
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600 font-medium">월요일 - 금요일</span>
                <span className="text-gray-900 font-bold">10:00 - 18:00</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600 font-medium">점심시간</span>
                <span className="text-gray-900 font-bold">13:00 - 14:00</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600 font-medium">목요일 오후 진료시작</span>
                <span className="text-blue-600 font-bold">14:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">일요일 / 공휴일</span>
                <span className="text-red-500 font-bold">휴진</span>
              </div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
              <p className="text-blue-800 font-semibold mb-2">목오전 휴진, 목요일 토요일 교차 휴진</p>
              <p className="text-sm text-blue-600 mb-4">근로기준법에 의거 병원가족 주5일 근무 합니다.</p>
              <a href="tel:032-461-2875" className="text-blue-800 font-bold text-xl hover:underline">📞 032-461-2875</a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 오시는 길 */}
      <section id="location" className="w-full max-w-5xl px-6 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-10 border-b border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              📍 오시는 길
            </h3>
            <div className="space-y-3 text-gray-600">
              <p><strong className="text-gray-800">주소:</strong> 인천광역시 남동구 백범로 212 2층<br/><span className="text-sm text-gray-400">(구주소: 남동구 만수3동 861-6)</span></p>
              <p><strong className="text-gray-800">전화:</strong> 032-461-2875</p>
              <p><strong className="text-gray-800">주차:</strong> 건물 내 주차 가능 여부 확인 필요</p>
            </div>
          </div>
          {/* 지도 영역 (나중에 네이버/카카오 지도 API로 교체) */}
          <div className="w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
            [ 네이버 지도 / 카카오맵 위젯이 들어갈 자리 ]
          </div>
        </div>
      </section>

      {/* 6. 하단 푸터 (법적 고지 사항) */}
      <footer className="w-full max-w-5xl px-6 mt-10 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        <p className="mb-2">상호: 연세김치과의원 | 원장: 김의수</p>
        <p>주소: 인천광역시 남동구 백범로 212 2층 | 사업자등록번호: 131-35-99094</p>
        <p className="mt-4 text-gray-400">© 2024 연세김치과의원. All rights reserved.</p>
      </footer>

    </main>
  );
}
