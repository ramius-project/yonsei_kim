'use client';

import React, { useState, useEffect } from 'react';
import initialSchedules from '@/data/schedules.json';

type ScheduleType = 'closed' | 'afternoon' | 'morning' | 'normal';

interface ScheduleItem {
  type: ScheduleType;
  note: string;
}

export default function MonthlyCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  
  // 특별 일정 상태 (schedules.json 및 로컬 스토리지 연동)
  const [specialSchedules, setSpecialSchedules] = useState<Record<string, ScheduleItem>>(initialSchedules as Record<string, ScheduleItem>);

  // 모달 및 알림 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDateStr, setEditDateStr] = useState('');
  const [editType, setEditType] = useState<ScheduleType>('closed');
  const [editNote, setEditNote] = useState('');
  const [saveStatusMsg, setSaveStatusMsg] = useState('');

  // 일정 변경 시 파일 및 로컬 스토리지에 자동 저장
  const saveSchedules = async (updated: Record<string, ScheduleItem>) => {
    setSpecialSchedules(updated);

    // 1. 로컬 스토리지 저장
    try {
      localStorage.setItem('YONSEI_KIM_SPECIAL_SCHEDULES', JSON.stringify(updated));
    } catch (e) {
      console.error('LocalStorage save failed:', e);
    }

    // 2. 백엔드 API를 통해 내 컴퓨터 파일(src/data/schedules.json)에 자동 저장!
    try {
      const res = await fetch('/api/save-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        setSaveStatusMsg('✅ 내 컴퓨터 파일에 코드도 자동으로 수정·저장되었습니다!');
        setTimeout(() => setSaveStatusMsg(''), 4000);
      }
    } catch (e) {
      console.error('Auto save API failed:', e);
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startingDayOfWeek = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };

  // 날짜별 상태 판단 함수
  const getDaySchedule = (yearNum: number, monthNum: number, dayNum: number) => {
    const dateObj = new Date(yearNum, monthNum, dayNum);
    const dateStr = `${yearNum}-${String(monthNum + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    const dayOfWeek = dateObj.getDay();

    if (specialSchedules[dateStr]) {
      return specialSchedules[dateStr];
    }

    if (dayOfWeek === 0) {
      return { type: 'closed' as const, note: '일요일 휴진' };
    }

    if (dayOfWeek === 4) {
      return { type: 'afternoon' as const, note: '오후진료 (14:00~18:00) / 목오전 휴진' };
    }

    if (dayOfWeek === 6) {
      return { type: 'morning' as const, note: '토요일 진료 (10:00~13:00, 교차휴진)' };
    }

    return { type: 'normal' as const, note: '정상진료 (10:00~18:00 / 점심 13:00~14:00)' };
  };

  // 모달 열기 (특정 날짜 수정)
  const handleOpenEditModal = (targetDate?: Date) => {
    const d = targetDate || selectedDate || new Date();
    const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    setEditDateStr(formattedDate);
    
    const existing = specialSchedules[formattedDate];
    if (existing) {
      setEditType(existing.type);
      setEditNote(existing.note);
    } else {
      setEditType('closed');
      setEditNote('');
    }
    
    setIsModalOpen(true);
  };

  // 모달 저장 처리
  const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editDateStr) return;

    const updated = {
      ...specialSchedules,
      [editDateStr]: {
        type: editType,
        note: editNote.trim() || (editType === 'closed' ? '휴진' : editType === 'afternoon' ? '오후진료' : '정상진료')
      }
    };

    await saveSchedules(updated);
    setIsModalOpen(false);
  };

  // 모달 일정 삭제 처리
  const handleDeleteSchedule = async () => {
    if (!editDateStr) return;
    const updated = { ...specialSchedules };
    delete updated[editDateStr];

    await saveSchedules(updated);
    setIsModalOpen(false);
  };

  const calendarCells = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= totalDays; day++) {
    calendarCells.push(day);
  }

  const selectedDayInfo = selectedDate ? {
    dateObj: selectedDate,
    dateStr: `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`,
    dayOfWeekStr: ['일', '월', '화', '수', '목', '금', '토'][selectedDate.getDay()],
    schedule: getDaySchedule(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
  } : null;

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden text-gray-800 relative">
      
      {/* 알림 메시지 스낵바 */}
      {saveStatusMsg && (
        <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 text-center animate-bounce">
          {saveStatusMsg}
        </div>
      )}

      {/* 1. 달력 상단 헤더 & 컨트롤 */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-5 md:p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📅</span>
          <div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              {year}년 {month + 1}월 진료 일정
            </h3>
            <p className="text-xs text-blue-100 font-medium">연세김치과의원 월간 스케줄</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenEditModal()}
            className="px-3 py-1.5 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-gray-900 rounded-lg shadow-sm transition flex items-center gap-1"
            title="웹에서 직접 일정 등록/수정"
          >
            ✏️ 휴진 등록
          </button>
          <button
            onClick={goToToday}
            className="hidden sm:inline-block px-3 py-1.5 text-xs font-semibold bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition"
          >
            오늘
          </button>
          <button
            onClick={prevMonth}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition text-lg"
            title="이전 달"
          >
            ‹
          </button>
          <button
            onClick={nextMonth}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition text-lg"
            title="다음 달"
          >
            ›
          </button>
        </div>
      </div>

      {/* 2. 범례 (Legend) */}
      <div className="bg-slate-50 px-4 py-3 border-b border-gray-100 flex flex-wrap items-center justify-around text-xs font-medium gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          <span>정상진료 (10-18시)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>목오후진료 (14-18시)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
          <span>토요일진료 (10-13시)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span>휴진</span>
        </div>
      </div>

      {/* 3. 요일 헤더 */}
      <div className="grid grid-cols-7 text-center font-bold text-xs py-2.5 border-b border-gray-100 bg-gray-50/50">
        <span className="text-rose-500">일</span>
        <span>월</span>
        <span>화</span>
        <span>수</span>
        <span className="text-amber-600">목</span>
        <span>금</span>
        <span className="text-teal-600">토</span>
      </div>

      {/* 4. 달력 날짜 그리드 */}
      <div className="grid grid-cols-7 p-2 md:p-3 gap-1 md:gap-1.5">
        {calendarCells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="h-12 md:h-14 bg-transparent"></div>;
          }

          const cellDate = new Date(year, month, day);
          const schedule = getDaySchedule(year, month, day);
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;
          const isSelected =
            selectedDate &&
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month &&
            selectedDate.getDate() === day;

          let badgeBg = 'bg-blue-50 text-blue-700 border-blue-200';
          let dotBg = 'bg-blue-500';
          let statusText = '정상';

          if (schedule.type === 'closed') {
            badgeBg = 'bg-rose-50 text-rose-700 border-rose-200';
            dotBg = 'bg-rose-500';
            statusText = '휴진';
          } else if (schedule.type === 'afternoon') {
            badgeBg = 'bg-amber-50 text-amber-700 border-amber-200';
            dotBg = 'bg-amber-500';
            statusText = '오후';
          } else if (schedule.type === 'morning') {
            badgeBg = 'bg-teal-50 text-teal-700 border-teal-200';
            dotBg = 'bg-teal-500';
            statusText = '토진료';
          }

          return (
            <button
              key={`day-${day}`}
              onClick={() => setSelectedDate(cellDate)}
              className={`relative h-14 md:h-16 p-1 rounded-xl flex flex-col items-center justify-between border transition group text-left ${
                isSelected
                  ? 'ring-2 ring-blue-600 shadow-md bg-blue-50/80 border-blue-300'
                  : 'border-gray-100 hover:border-blue-200 hover:bg-slate-50'
              } ${isToday ? 'bg-blue-50/40 font-bold' : ''}`}
            >
              <div className="w-full flex items-center justify-between">
                <span
                  className={`text-xs md:text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center ${
                    isToday
                      ? 'bg-blue-600 text-white shadow-sm'
                      : cellDate.getDay() === 0
                      ? 'text-rose-500'
                      : cellDate.getDay() === 6
                      ? 'text-teal-600'
                      : 'text-gray-700'
                  }`}
                >
                  {day}
                </span>

                {isToday && (
                  <span className="hidden md:inline-block text-[10px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.2 rounded-full">
                    오늘
                  </span>
                )}
              </div>

              <div className="w-full flex items-center justify-center mt-1">
                <span className={`w-full text-center text-[10px] md:text-[11px] font-medium py-0.5 rounded-md border ${badgeBg} hidden sm:block truncate px-0.5`}>
                  {statusText}
                </span>
                <span className={`w-2 h-2 rounded-full ${dotBg} sm:hidden`}></span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 5. 선택한 날짜 상세안내 박스 */}
      {selectedDayInfo && (
        <div className="m-3 p-4 bg-blue-50/70 rounded-2xl border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-900 text-sm md:text-base">
                {selectedDayInfo.dateStr} ({selectedDayInfo.dayOfWeekStr})
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                  selectedDayInfo.schedule.type === 'closed'
                    ? 'bg-rose-100 text-rose-700 border-rose-300'
                    : selectedDayInfo.schedule.type === 'afternoon'
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : selectedDayInfo.schedule.type === 'morning'
                    ? 'bg-teal-100 text-teal-800 border-teal-300'
                    : 'bg-blue-100 text-blue-800 border-blue-300'
                }`}
              >
                {selectedDayInfo.schedule.type === 'closed'
                  ? '휴진'
                  : selectedDayInfo.schedule.type === 'afternoon'
                  ? '오후진료'
                  : selectedDayInfo.schedule.type === 'morning'
                  ? '토요일진료'
                  : '정상진료'}
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-700 mt-1">
              📌 {selectedDayInfo.schedule.note}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleOpenEditModal(selectedDayInfo.dateObj)}
              className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold shadow-sm transition whitespace-nowrap"
            >
              ✏️ 이 날짜 휴진/일정 수정
            </button>
            <a
              href="tel:032-461-2875"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs md:text-sm font-semibold shadow-sm transition whitespace-nowrap text-center"
            >
              📞 전화예약
            </a>
          </div>
        </div>
      )}

      {/* 6. 하단 안내문 */}
      <div className="bg-gray-50 px-4 py-2.5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-2">
        <span>💡 웹 화면에서 휴진 일정을 변경하시면 내 컴퓨터 파일(schedules.json)에 자동 수정·저장됩니다!</span>
        <button
          onClick={() => handleOpenEditModal()}
          className="text-blue-600 hover:underline font-medium text-xs whitespace-nowrap"
        >
          ⚙️ 웹에서 일정 입력/관리하기 ➔
        </button>
      </div>

      {/* 7. 일정 입력/수정 모달 (Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-gray-100 animate-fadeIn">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
              <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                ⚙️ 휴진 및 진료 일정 등록/수정
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold px-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSchedule} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  날짜 선택 (YYYY-MM-DD)
                </label>
                <input
                  type="date"
                  value={editDateStr}
                  onChange={(e) => setEditDateStr(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  진료 구별
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditType('closed')}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition ${
                      editType === 'closed'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    🔴 휴진
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditType('afternoon')}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition ${
                      editType === 'afternoon'
                        ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                        : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    🟡 목오후진료 (14-18시)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditType('morning')}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition ${
                      editType === 'morning'
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100'
                    }`}
                  >
                    🟢 토요일진료 (10-13시)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditType('normal')}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition ${
                      editType === 'normal'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
                    }`}
                  >
                    🔵 정상진료 (10-18시)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  휴진/일정 사유 입력
                </label>
                <input
                  type="text"
                  placeholder="예: 추석 연휴, 개천절, 원장님 세미나 휴진 등"
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>

              <div className="pt-3 flex flex-col gap-2">
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-sm shadow-md transition"
                  >
                    💾 저장 (파일에 자동 수정 반영)
                  </button>
                  {specialSchedules[editDateStr] && (
                    <button
                      type="button"
                      onClick={handleDeleteSchedule}
                      className="px-4 bg-rose-100 hover:bg-rose-200 text-rose-700 py-2.5 rounded-xl font-bold text-sm transition"
                    >
                      삭제
                    </button>
                  )}
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-xs text-gray-500 hover:underline"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
