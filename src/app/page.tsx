import {
  BookOpen,
  ExternalLink,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  User,
} from 'lucide-react';
import profile from '@/content/profile.json';

const basePath = process.env.PAGES_BASE_PATH ?? '';

export default function Home() {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-[#ded9d2] bg-[#f8f6f2]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="font-serif text-lg font-semibold tracking-wide text-[#243442]">
            {profile.name}
          </a>
          <div className="flex items-center gap-5 text-sm text-[#5d6872]">
            <a href="#about" className="transition-colors hover:text-[#a86f38]">关于</a>
            <a href="#research" className="transition-colors hover:text-[#a86f38]">科研成果</a>
          </div>
        </div>
      </nav>

      <main id="top" className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
        <section className="overflow-hidden rounded-lg border border-[#ded9d2] bg-[#fffdf9]/90 shadow-[0_18px_60px_rgba(44,62,80,0.08)]">
          <div className="h-1 bg-[#c48a52]" />
          <div className="flex flex-col items-start gap-7 p-6 sm:p-10 md:flex-row md:items-center md:gap-10">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#c48a52] bg-[#ebe7e0] shadow-inner sm:h-32 sm:w-32">
              {profile.avatar ? (
                <img
                  src={profile.avatar.startsWith('/') ? `${basePath}${profile.avatar}` : profile.avatar}
                  alt={`${profile.name}的头像`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-14 w-14 text-[#6b7280]" aria-hidden="true" />
              )}
            </div>
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-[0.22em] text-[#a86f38]">ACADEMIC PROFILE</p>
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#2c3e50] sm:text-4xl">
                {profile.name}
              </h1>
              <p className="text-lg text-[#5f6972] sm:text-xl">{profile.title}</p>
              {profile.location && (
                <p className="flex items-center gap-2 text-sm text-[#6b7280]">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {profile.location}
                </p>
              )}
              <div className="flex flex-wrap gap-2 pt-1">
                {profile.interests.slice(0, 4).map((interest) => (
                  <span key={interest.name} className="rounded border border-[#ded5ca] bg-[#f7f2eb] px-3 py-1 text-sm text-[#53606b]">
                    {interest.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 rounded-lg border border-[#e2ddd6] bg-[#fffdf9] p-6 shadow-[0_10px_35px_rgba(44,62,80,0.05)] sm:p-10">
          <h2 className="mb-8 font-serif text-2xl text-[#2c3e50]">基本情况</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {profile.email && (
              <InfoItem icon={<Mail />} label="邮箱">
                <a href={`mailto:${profile.email}`} className="hover:text-[#a86f38] hover:underline">{profile.email}</a>
              </InfoItem>
            )}
            {profile.contact && (
              <InfoItem icon={<MessageCircle />} label="其他联系方式">{profile.contact}</InfoItem>
            )}
          </div>

          <div className="my-7 h-px bg-[#e5e1db]" />

          <div className="space-y-8">
            <InfoItem icon={<User />} label="个人简介">
              <div className="space-y-3">
                {profile.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </InfoItem>

            <InfoItem icon={<GraduationCap />} label="教育背景">
              <ul className="space-y-3">
                {profile.education.map((item) => (
                  <li key={`${item.period}-${item.school}`}>
                    <p className="font-medium text-[#2c3e50]">{item.period} · {item.school}</p>
                    <p className="mt-1 text-sm text-[#66717b]">{item.degree}</p>
                  </li>
                ))}
              </ul>
            </InfoItem>

            <InfoItem icon={<BookOpen />} label="研究兴趣">
              <div className="grid gap-4 sm:grid-cols-2">
                {profile.interests.map((interest) => (
                  <div key={interest.name} className="border-l-2 border-[#c48a52] pl-4">
                    <h3 className="font-medium text-[#2c3e50]">{interest.name}</h3>
                    {interest.description && <p className="mt-1 text-sm text-[#66717b]">{interest.description}</p>}
                  </div>
                ))}
              </div>
            </InfoItem>
          </div>
        </section>

        <section id="research" className="scroll-mt-24 rounded-lg border border-[#e2ddd6] bg-[#fffdf9] p-6 shadow-[0_10px_35px_rgba(44,62,80,0.05)] sm:p-10">
          <h2 className="font-serif text-2xl text-[#2c3e50]">科研成果</h2>

          {profile.projects.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 flex items-center gap-2 font-medium text-[#2c3e50]">
                <BookOpen className="h-5 w-5 text-[#a86f38]" />
                科研项目
              </h3>
              <div className="space-y-3">
                {profile.projects.map((project) => (
                  <article key={`${project.year}-${project.title}`} className="rounded border border-[#e5e1db] p-5">
                    <p className="text-sm font-semibold text-[#a86f38]">{project.year}</p>
                    <h4 className="mt-1 font-medium text-[#222b33]">{project.title}</h4>
                    {project.description && <p className="mt-2 text-sm leading-6 text-[#66717b]">{project.description}</p>}
                  </article>
                ))}
              </div>
            </div>
          )}

          {profile.publications.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 flex items-center gap-2 font-medium text-[#2c3e50]">
                <FileText className="h-5 w-5 text-[#a86f38]" />
                论文与著作
              </h3>
              <div className="space-y-3">
                {profile.publications.map((publication) => (
                  <article key={`${publication.year}-${publication.title}`} className="rounded border border-[#e5e1db] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#a86f38]">{publication.year}</p>
                        <h4 className="mt-1 font-medium text-[#222b33]">{publication.title}</h4>
                      </div>
                      {publication.link && (
                        <a href={publication.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-[#a86f38] hover:underline">
                          查看 <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                    {publication.authors && <p className="mt-2 text-sm text-[#66717b]">{publication.authors}</p>}
                    {publication.venue && <p className="mt-1 text-sm italic text-[#66717b]">{publication.venue}</p>}
                  </article>
                ))}
              </div>
            </div>
          )}

          {profile.projects.length === 0 && profile.publications.length === 0 && (
            <p className="mt-8 rounded border border-dashed border-[#d8d2ca] p-8 text-center text-[#78818a]">
              科研成果将在这里持续更新
            </p>
          )}
        </section>
      </main>

      <footer className="mt-16 border-t border-[#ded9d2] bg-[#f2efe9] py-8">
        <p className="text-center text-sm text-[#737b83]">
          © {new Date().getFullYear()} {profile.name} · 学术与科研
        </p>
      </footer>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactElement<{ className?: string; 'aria-hidden'?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-[#78818a]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="mb-2 text-sm text-[#78818a]">{label}</p>
        <div className="leading-7 text-[#20262c]">{children}</div>
      </div>
    </div>
  );
}
