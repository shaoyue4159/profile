'use client';

import { useState } from 'react';
import {
  BookOpen,
  BriefcaseBusiness,
  ExternalLink,
  FileText,
  Globe2,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Microscope,
  Newspaper,
  Orbit,
  Presentation,
  School,
  Sparkles,
  User,
  Users,
} from 'lucide-react';
import profile from '@/content/profile.json';

const basePath = process.env.PAGES_BASE_PATH ?? '';
type Language = 'zh' | 'en';
type Publication =
  | (typeof profile.representativePublications)[number]
  | (typeof profile.otherPublications)[number];

const ui = {
  zh: {
    nav: [
      ['简介', '#intro'],
      ['联系', '#contact'],
      ['项目', '#projects'],
      ['论文', '#publications'],
    ],
    academicProfile: 'ACADEMIC PROFILE',
    intro: '个人简介',
    career: '教育与任职',
    education: '教育背景',
    employment: '工作经历',
    research: '研究方向',
    contact: '联系与主页',
    projects: '科研项目',
    teaching: '教学与指导',
    courses: '主讲课程',
    publications: '论文成果',
    representative: '代表性论文',
    other: '其他论文',
    coverage: '媒体报道与延伸阅读',
    view: '查看全文',
    journalCover: '期刊封面',
    coverHint: 'JOURNAL COVER',
    lastUpdated: '最后更新：2026 年 6 月',
    switchLabel: 'English',
  },
  en: {
    nav: [
      ['About', '#intro'],
      ['Contact', '#contact'],
      ['Projects', '#projects'],
      ['Papers', '#publications'],
    ],
    academicProfile: 'ACADEMIC PROFILE',
    intro: 'About',
    career: 'Education & Appointments',
    education: 'Education',
    employment: 'Appointments',
    research: 'Research',
    contact: 'Contact & Profiles',
    projects: 'Projects',
    teaching: 'Teaching & Supervision',
    courses: 'Courses',
    publications: 'Publications',
    representative: 'Selected Publications',
    other: 'Other Publications',
    coverage: 'Media Coverage & Further Reading',
    view: 'View paper',
    journalCover: 'Journal Cover',
    coverHint: 'JOURNAL COVER',
    lastUpdated: 'Last updated: June 2026',
    switchLabel: '中文',
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>('zh');
  const content = profile[language];
  const text = ui[language];

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-[#d6e0e2] bg-[#f7faf9]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-5 gap-y-2 px-4 py-3 sm:flex-nowrap sm:px-6">
          <a href="#top" className="font-serif text-xl font-bold tracking-wide text-[#102f4a]">
            {content.name}
          </a>
          <div className="order-3 flex w-full items-center justify-between gap-3 border-t border-[#dfe7e8] pt-2 text-sm font-medium text-[#405565] sm:order-none sm:w-auto sm:border-0 sm:pt-0">
            {text.nav.map(([label, href]) => (
              <a key={href} href={href} className="transition-colors hover:text-[#176b5b]">
                {label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#b9cacc] bg-white px-3 py-1.5 text-xs font-semibold text-[#176b5b] transition hover:border-[#176b5b] hover:bg-[#eef7f4]"
            aria-label={language === 'zh' ? 'Switch to English' : '切换到中文'}
          >
            <Languages className="h-3.5 w-3.5" />
            {text.switchLabel}
          </button>
        </div>
      </nav>

      <main id="top" className="mx-auto max-w-6xl space-y-10 px-4 py-7 sm:space-y-14 sm:px-6 sm:py-12">
        <section className="overflow-hidden rounded-2xl border border-[#d6e0e2] bg-white shadow-[0_22px_70px_rgba(16,47,74,0.09)]">
          <div className="h-1.5 bg-gradient-to-r from-[#102f4a] via-[#176b5b] to-[#75a89b]" />
          <div className="flex flex-col items-start gap-5 p-5 sm:p-8 md:flex-row md:items-center md:gap-10 md:p-10">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[#d8e7e3] bg-[#e9efef] shadow-inner sm:h-36 sm:w-36">
              {profile.avatar ? (
                <img
                  src={assetPath(profile.avatar)}
                  alt={language === 'zh' ? `${content.name}的头像` : `Portrait of ${content.name}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-14 w-14 text-[#6d7e87]" aria-hidden="true" />
              )}
            </div>
            <div className="space-y-3.5">
              <p className="text-xs font-bold tracking-[0.24em] text-[#176b5b]">{text.academicProfile}</p>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-[#102f4a] sm:text-5xl">
                {content.name}
              </h1>
              <p className="text-lg font-medium text-[#526673] sm:text-xl">{content.title}</p>
              <p className="flex items-center gap-2 text-sm text-[#667983]">
                <MapPin className="h-4 w-4 shrink-0 text-[#176b5b]" aria-hidden="true" />
                {content.location}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {content.interests.map((interest) => (
                  <span
                    key={interest.name}
                    className="rounded-full border border-[#c7d8d5] bg-[#f0f7f5] px-3 py-1 text-sm font-medium text-[#315e56]"
                  >
                    {interest.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Section id="intro" title={text.intro} icon={<User />}>
          <div className="max-w-4xl space-y-4 text-[1.05rem] leading-8 text-[#334854]">
            {content.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </Section>

        <Section id="career" title={text.career} icon={<GraduationCap />}>
          <div className="grid gap-8 md:grid-cols-2">
            <Timeline title={text.education} icon={<School />} items={content.education.map((item) => ({
              period: item.period,
              title: item.school,
              detail: item.degree,
            }))} />
            <Timeline title={text.employment} icon={<BriefcaseBusiness />} items={content.employment.map((item) => ({
              period: item.period,
              title: item.organization,
              detail: item.role,
            }))} />
          </div>
        </Section>

        <Section id="research" title={text.research} icon={<Microscope />} tinted>
          <div className="grid gap-5 md:grid-cols-3">
            {content.interests.map((interest, index) => (
              <article key={interest.name} className="rounded-xl border border-[#cbdcda] bg-white p-5">
                <p className="mb-3 font-mono text-xs font-bold text-[#176b5b]">0{index + 1}</p>
                <h3 className="text-xl font-bold text-[#102f4a]">{interest.name}</h3>
                <p className="mt-3 leading-7 text-[#526773]">{interest.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <section className="overflow-hidden rounded-2xl border border-[#244b65] bg-[#102f4a] text-white shadow-[0_22px_70px_rgba(16,47,74,0.16)]">
          <div className="grid md:grid-cols-[1.35fr_0.65fr]">
            <div className="p-6 sm:p-9">
              <div className="mb-7 flex items-center gap-3 border-b border-white/15 pb-5">
                <span className="rounded-lg bg-[#7dc2b3] p-2 text-[#102f4a]">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                  {content.highlight.eyebrow}
                </h2>
              </div>
              <h3 className="font-serif text-2xl font-bold leading-tight sm:text-3xl">{content.highlight.title}</h3>
              <p className="mt-5 leading-8 text-[#dce8ec]">{content.highlight.description}</p>
              <div className="mt-7">
                <p className="mb-3 flex items-center gap-2 text-sm font-bold text-[#a8d7cd]">
                  <Newspaper className="h-4 w-4" />
                  {text.coverage}
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.highlightLinks.map((link) => (
                    <ExternalButton
                      key={link.url}
                      href={link.url}
                      label={localizedLinkLabel(link, language)}
                      inverse
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="relative min-h-72 overflow-hidden border-t border-white/15 md:min-h-full md:border-l md:border-t-0">
              {profile.highlightImage ? (
                <img
                  src={assetPath(profile.highlightImage)}
                  alt={text.journalCover}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_22%,#2d7590_0%,#173f60_34%,#071d35_78%)] p-8 text-center">
                  <Orbit className="h-20 w-20 text-[#7dc2b3]" strokeWidth={1.2} />
                  <p className="mt-5 text-xs font-bold tracking-[0.28em] text-[#a8d7cd]">{text.coverHint}</p>
                  <p className="mt-2 font-serif text-2xl font-bold">{text.journalCover}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <Section id="contact" title={text.contact} icon={<Mail />}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ContactCard icon={<Mail />} label={language === 'zh' ? '邮箱' : 'Email'} value={profile.email} href={`mailto:${profile.email}`} />
            {profile.links.map((link) => (
              <ContactCard
                key={link.url}
                icon={link.type === 'school' ? <School /> : <Globe2 />}
                label={localizedLinkLabel(link, language)}
                value={link.type === 'orcid' ? '0000-0001-6620-2826' : language === 'zh' ? '访问个人主页' : 'View profile'}
                href={link.url}
              />
            ))}
          </div>
        </Section>

        <Section id="teaching" title={text.teaching} icon={<Presentation />} tinted>
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-xl border border-[#cbdcda] bg-white p-6">
              <p className="flex items-center gap-2 text-sm font-bold text-[#176b5b]">
                <BookOpen className="h-4 w-4" />
                {text.courses}
              </p>
              {content.courses.map((course) => (
                <div key={course.name} className="mt-4">
                  <h3 className="text-xl font-bold text-[#102f4a]">{course.name}</h3>
                  <p className="mt-1 text-[#667983]">{course.description}</p>
                </div>
              ))}
            </article>
            <article className="rounded-xl border border-[#cbdcda] bg-white p-6">
              <p className="flex items-center gap-2 text-sm font-bold text-[#176b5b]">
                <Users className="h-4 w-4" />
                {content.students.title}
              </p>
              <p className="mt-4 leading-7 text-[#526773]">{content.students.description}</p>
            </article>
          </div>
        </Section>

        <Section id="projects" title={text.projects} icon={<BriefcaseBusiness />}>
          <div className="grid gap-4 md:grid-cols-2">
            {content.projects.map((project) => (
              <article key={project.title} className="rounded-xl border border-[#d6e0e2] bg-white p-6 transition hover:border-[#8db7ae] hover:shadow-md">
                <p className="text-sm font-bold text-[#176b5b]">{project.period}</p>
                <h3 className="mt-2 text-xl font-bold text-[#102f4a]">{project.title}</h3>
                <p className="mt-3 inline-flex rounded-full bg-[#eaf4f1] px-3 py-1 text-sm font-semibold text-[#315e56]">{project.role}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="publications" title={text.publications} icon={<FileText />} tinted>
          <PublicationGroup
            title={text.representative}
            publications={profile.representativePublications}
            viewLabel={text.view}
            language={language}
            featured
          />
          <div className="my-10 h-px bg-[#cbd8da]" />
          <PublicationGroup
            title={text.other}
            publications={profile.otherPublications}
            viewLabel={text.view}
            language={language}
          />
        </Section>
      </main>

      <footer className="mt-16 border-t border-[#cfdadd] bg-[#102f4a] py-9 text-[#d9e6e9]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-center text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left">
          <p>© {new Date().getFullYear()} {content.name}</p>
          <p>{text.lastUpdated}</p>
        </div>
      </footer>
    </div>
  );
}

function assetPath(path: string) {
  return path.startsWith('/') ? `${basePath}${path}` : path;
}

function localizedLinkLabel(
  link: { label: string; labelEn?: string },
  language: Language,
) {
  return language === 'en' && link.labelEn ? link.labelEn : link.label;
}

function Section({
  id,
  title,
  icon,
  children,
  tinted = false,
}: {
  id: string;
  title: string;
  icon: React.ReactElement;
  children: React.ReactNode;
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 rounded-2xl border border-[#d6e0e2] p-6 shadow-[0_12px_40px_rgba(16,47,74,0.055)] sm:p-9 ${
        tinted ? 'bg-[#edf5f3]' : 'bg-white'
      }`}
    >
      <div className="mb-7 flex items-center gap-3 border-b border-[#d7e1e2] pb-5">
        <span className="rounded-lg bg-[#102f4a] p-2 text-white [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
        <h2 className="font-serif text-3xl font-bold text-[#102f4a] sm:text-4xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Timeline({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactElement;
  items: Array<{ period: string; title: string; detail: string }>;
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg font-bold text-[#176b5b]">
        <span className="[&>svg]:h-5 [&>svg]:w-5">{icon}</span>
        {title}
      </h3>
      <div className="mt-5 space-y-5 border-l-2 border-[#9cc1b9] pl-5">
        {items.map((item) => (
          <article key={`${item.period}-${item.title}`} className="relative">
            <span className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-[#176b5b] ring-1 ring-[#8fb8af]" />
            <p className="text-sm font-bold text-[#176b5b]">{item.period}</p>
            <h4 className="mt-1 text-lg font-bold text-[#102f4a]">{item.title}</h4>
            <p className="mt-1 text-[#667983]">{item.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactElement;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
      className="group rounded-xl border border-[#d6e0e2] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#6fa99d] hover:shadow-md"
    >
      <span className="inline-flex rounded-lg bg-[#eaf4f1] p-2.5 text-[#176b5b] [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
      <p className="mt-4 font-bold text-[#102f4a]">{label}</p>
      <p className="mt-1 break-words text-sm text-[#61747e] group-hover:text-[#176b5b]">{value}</p>
    </a>
  );
}

function ExternalButton({ href, label, inverse = false }: { href: string; label: string; inverse?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
        inverse
          ? 'border-white/25 bg-white/10 text-white hover:border-[#91d2c4] hover:bg-white/15'
          : 'border-[#b9cfca] bg-white text-[#176b5b] hover:border-[#176b5b]'
      }`}
    >
      {label}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

function PublicationGroup({
  title,
  publications,
  viewLabel,
  language,
  featured = false,
}: {
  title: string;
  publications: readonly Publication[];
  viewLabel: string;
  language: Language;
  featured?: boolean;
}) {
  return (
    <div>
      <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-[#102f4a]">
        {featured && <Sparkles className="h-5 w-5 text-[#176b5b]" />}
        {title}
      </h3>
      <div className="space-y-4">
        {publications.map((publication) => (
          <article
            key={`${publication.year}-${publication.title}`}
            className={`rounded-xl border bg-white p-5 sm:p-6 ${
              featured ? 'border-[#86afa7] shadow-[inset_4px_0_0_#176b5b]' : 'border-[#d3dfe0]'
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[#102f4a] px-2.5 py-1 text-xs font-bold text-white">{publication.year}</span>
                  <span className="font-serif text-sm font-bold italic text-[#176b5b]">{publication.venue}</span>
                </div>
                <h4 className="text-lg font-bold leading-7 text-[#172f43]">{publication.title}</h4>
              </div>
              <a
                href={publication.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-[#176b5b] hover:underline"
              >
                {viewLabel}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#61747e]">
              <HighlightAuthor authors={publication.authors} />
            </p>
            {publicationSummary(publication, language) && (
              <p className="mt-4 border-t border-[#dce5e5] pt-4 text-sm leading-7 text-[#405965]">
                {publicationSummary(publication, language)}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

function publicationSummary(publication: Publication, language: Language) {
  if (language === 'zh' && 'summaryZh' in publication) return publication.summaryZh;
  if (language === 'en' && 'summaryEn' in publication) return publication.summaryEn;
  return '';
}

function HighlightAuthor({ authors }: { authors: string }) {
  return (
    <>
      {authors.split(/(Yue Shao)/g).map((part, index) =>
        part === 'Yue Shao' ? (
          <strong key={`${part}-${index}`} className="font-extrabold text-[#102f4a]">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}
