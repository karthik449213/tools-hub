import Image from "next/image";
import Link from "next/link";

export default function InlineAd() {
  return (
    <div className="my-10 flex justify-center">
      <Link
        href="https://manychat.partnerlinks.io/c08p8qna3uyj"
        target="_blank"
        rel="nofollow sponsored noopener"
        className="block w-full max-w-xl"
      >
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 hover:shadow-md transition">
          <p className="text-xs text-gray-400 mb-2 text-center">
            Sponsored
          </p>
          <Image
            src="/COLD-AD1-1200x628PX - Story Ads Mention.png" // put image in /public
            alt="Sponsored Ad"
            width={600}
            height={300}
            className="rounded-md object-contain w-full"
          />
        </div>
      </Link>
    </div>
  );
}
