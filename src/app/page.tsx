export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50">
      
      {/* 1. 상단 헤더 (네비게이션) */}
      <header className="w-full fixed top-0 bg-white shadow-sm z-10 px-6 py-4 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-bold text-blue-800 flex items-center gap-2">
          🦷 연세김치과의원
        </h1>
        <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
          <a href="#about" className="hover:text-blue-600 transition">병원소개</a>
          <a href="#services" className="hover:text-blue-600 transition">진료과목</a>
          <a href="#location" className="hover:text-blue-600 transition">오시는길</a>
        </nav>
        <a href="tel:02-123-4567" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition shadow-md">
          📞 전화예약
        </a>
      </header>

      {/* 2. 히어로 섹션 (첫 화면 메인) */}
      <section className="mt-24 w-full max-w-6xl px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-1/2 space-y-6">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            20년 경력의 전문의 직접 진료
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            가족처럼 편안하게,<br/>
            <span className="text-blue-600">내 치아처럼 소중하게.</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            과잉 진료 없이 꼭 필요한 치료만 약속드립니다.<br/>
            최신 장비를 갖춘 깨끗한 환경에서 안심하고 진료받으세요.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              온라인 예약하기
            </button>
            <button className="border border-blue-200 bg-white text-blue-600 px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition">
              진료과목 보기
            </button>
          </div>
        </div>
        
        {/* 오른쪽 이미지 영역 (나중에 실제 병원 사진으로 교체) */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-tr from-blue-100 to-teal-50 rounded-full flex items-center justify-center text-8xl shadow-inner border-4 border-white">
            🏥
          </div>
        </div>
      </section>

      {/* 3. 진료 과목 미리보기 */}
      <section id="services" className="w-full max-w-6xl px-6 py-16">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">주요 진료 과목</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: '🦷', title: '일반진료', desc: '충치치료, 스케일링' },
            { icon: '✨', title: '심미보철', desc: '라미네이트, 올세라믹' },
            { icon: '🔩', title: '임플란트', desc: '디지털 정밀 임플란트' },
            { icon: '😁', title: '치아교정', desc: '투명교정, 부분교정' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center border border-gray-100">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}