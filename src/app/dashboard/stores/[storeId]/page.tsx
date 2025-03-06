import FormCardSkeleton from "@/components/form-card-skeleton";
import PageContainer from "@/components/layout/page-container";
import StoreViewPage from "@/components/stores/store-view-page";
import { Suspense } from "react";

export const metadata = {
  title: "Dashboard : Store View",
};

type PageProps = { params: Promise<{ storeId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <StoreViewPage storeId={params.storeId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
