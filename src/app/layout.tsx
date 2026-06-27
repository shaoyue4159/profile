import type { Metadata } from 'next';
import './globals.css';
import profile from '@/content/profile.json';

export const metadata: Metadata = {
  title: {
    default: `${profile.name}｜个人学术主页`,
    template: `%s｜${profile.name}`,
  },
  description: '个人学术主页：研究方向、教育经历、科研项目与论文成果。',
  keywords: [
    '个人主页',
    '学术主页',
    '科研成果',
    '研究方向',
    '论文',
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name}｜个人学术主页`,
    description: '研究方向、教育经历、科研项目与论文成果。',
    siteName: '个人学术主页',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
