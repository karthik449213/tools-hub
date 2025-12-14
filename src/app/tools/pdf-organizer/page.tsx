import SidebarAd from '@/components/SidebarAd';
import TopBannerAd from '@/components/TopBannerAd';
import InlineAd from '@/components/InlineAd';
import PDFOrganizerClient from './PDFOrganizerClient';

export const dynamic = 'force-dynamic';

export default function PDFOrganizerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <TopBannerAd />
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <PDFOrganizerClient />
          <InlineAd />
        </div>

        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            <SidebarAd />
          </div>
        </aside>
      </div>
    </div>
  );
}
