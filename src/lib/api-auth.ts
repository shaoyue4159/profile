import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function requireEditor(request: Request) {
  const authorization = request.headers.get('authorization');
  const token = authorization?.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : null;

  if (!token) {
    return {
      error: NextResponse.json(
        { success: false, error: '请先登录后再进行编辑' },
        { status: 401 },
      ),
    };
  }

  const authClient = getSupabaseClient(token);
  const { data, error } = await authClient.auth.getUser(token);

  if (error || !data.user) {
    return {
      error: NextResponse.json(
        { success: false, error: '登录状态已失效，请重新登录' },
        { status: 401 },
      ),
    };
  }

  const editorEmail = process.env.EDITOR_EMAIL?.trim().toLowerCase();
  if (editorEmail && data.user.email?.toLowerCase() !== editorEmail) {
    return {
      error: NextResponse.json(
        { success: false, error: '当前账号没有编辑权限' },
        { status: 403 },
      ),
    };
  }

  return { user: data.user };
}
