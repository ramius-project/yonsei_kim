import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // schedules.json 파일 경로
    const filePath = path.join(process.cwd(), 'src', 'data', 'schedules.json');
    
    // 파일에 prettified JSON 쓰기
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: '파일에 자동으로 저장되었습니다.' });
  } catch (error) {
    console.error('Failed to save schedule to file:', error);
    return NextResponse.json({ success: false, error: '파일 저장 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
