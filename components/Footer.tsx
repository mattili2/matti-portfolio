import Image from "next/image";
import Link from "next/link";

type SocialItem = {
  label: string;
  icon: string;
  size: number;
  href?: string;
};

const socialLinks: SocialItem[] = [
  {
    href: "https://www.xiaohongshu.com/user/profile/63ed8cbf0000000027036e28?xhsshare=CopyLink&appuid=63ed8cbf0000000027036e28&apptime=1732080984&share_id=86050034775d458aa262753cd0f2a120",
    label: "小红书",
    icon: "/icons/xiaohongshu.png",
    size: 18,
  },
  {
    href: "https://www.douyin.com/user/MS4wLjABAAAAccAVpz6LwX1rOnS14pdiptDPNEUo3vg6VQ4yXXZnBD0?previous_page=web_code_link",
    label: "抖音",
    icon: "/icons/douyin.png",
    size: 18,
  },
  {
    label: "Instagram",
    icon: "/icons/instagram.png",
    size: 18,
  },
];

type FooterProps = {
  name: string;
};

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}

export function Footer({ name }: FooterProps) {
  return (
    <footer className="w-full px-[var(--content-pad)] pb-16 pt-24">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-base font-normal">{name}</p>
        <a
          href="mailto:mattili2@outlook.com"
          className="inline-flex items-center gap-1.5 text-sm"
        >
          <MailIcon className="shrink-0" />
          mattili2@outlook.com
        </a>
        <div className="mt-2 flex items-center gap-4">
          {socialLinks.map((item) => {
            const icon = (
              <Image
                src={item.icon}
                alt=""
                width={item.size}
                height={item.size}
                className="h-[18px] w-[18px] object-contain"
              />
            );

            if (!item.href) {
              return (
                <span key={item.label} aria-label={item.label}>
                  {icon}
                </span>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="inline-flex"
              >
                {icon}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
