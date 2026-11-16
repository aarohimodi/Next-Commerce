import Link from "next/link";

interface FooterColumnProps {
  title: string;
  links: {
    title: string;
    href: string;
  }[];
}
export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.title}>
            <Link href={link.href} className="text-gray-400 hover:text-white">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
