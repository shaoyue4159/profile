import type { Metadata } from 'next';
import './globals.css';
import profile from '@/content/profile.json';

export const metadata: Metadata = {
  title: {
    default: `${profile.zh.name}｜个人学术主页`,
    template: `%s｜${profile.zh.name}`,
  },
  description: '邵悦，辽宁师范大学讲师、硕士生导师。研究方向包括 21 cm 森林、纳赫兹引力波与多探针宇宙学。',
  keywords: [
    '邵悦',
    'Yue Shao',
    '21 cm forest',
    '纳赫兹引力波',
    '辽宁师范大学',
    '宇宙学',
  ],
  authors: [{ name: profile.zh.name }],
  creator: profile.zh.name,
  openGraph: {
    title: `${profile.zh.name}｜个人学术主页`,
    description: '21 cm 森林、纳赫兹引力波与多探针宇宙学研究。',
    siteName: `${profile.zh.name}｜个人学术主页`,
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
