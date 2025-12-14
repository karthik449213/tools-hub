import Image from "next/image";
import Link from "next/link";

export default function TopBannerAd() {
  return (
    <div className="w-full flex justify-center">
      <Link
        href="https://manychat.partnerlinks.io/c08p8qna3uyj"
        target="_blank"
        rel="nofollow sponsored noopener"
        className="block"
      >
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 hover:shadow-md transition">
          <Image
            src="/Lin Personal cover 1584x386-22.png" // put image in /public
            alt="Sponsored Banner"
            width={970}
            height={90}
            className="rounded-md object-contain w-full max-w-[970px]"
            priority
          />
        </div>
      </Link>
    </div>
  );
}
