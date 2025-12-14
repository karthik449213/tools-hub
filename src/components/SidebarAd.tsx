import Image from "next/image";
import Link from "next/link";

export default function SidebarAd() {
  return (
    <div className="hidden lg:block">
      <Link
        href="https://manychat.partnerlinks.io/jd8ubvsxibfy-wki14"
        target="_blank"
        rel="nofollow sponsored noopener"
        className="block"
      >
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-2 hover:border-gray-400 transition">
          <Image
            src="/sidebarad.png"
            alt="Sponsored Ad"
            width={960}
            height={1200}
            className="rounded-md object-contain w-full max-h-[600px]"
            priority
          />
        </div>
      </Link>
    </div>
  );
}
