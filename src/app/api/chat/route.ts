import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // 请求本地 Ollama 接口
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen2:1.5b', // 建议先用这个轻量的，响应极快
        prompt: prompt,
        stream: false,      // 第一步：先不做流式，只求跑通
      }),
    });

    if (!response.ok) {
      throw new Error('Ollama 响应异常');
    }

    const data = await response.json();
    return NextResponse.json({ reply: data.response });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'AI 引擎未就绪' }, { status: 500 });
  }
}