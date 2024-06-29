import WidthWrapper from "@/components/global/MaxWidthWrapper";
import Navbar from "@/components/global/Navbar";
import ExplorePageContent from "./ExplorePageContent";

const Page = () => {
  return (
    <div>
      <Navbar />
      <main className="mt-5 flex min-h-screen">
        {/* Filters */}
        <div className="fixed left-5 top-24"></div>
        {/* Main content */}
        <WidthWrapper>
          <ExplorePageContent />
        </WidthWrapper>
      </main>
    </div>
  );
};

export default Page;
