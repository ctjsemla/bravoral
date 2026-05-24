import { UtilityBar } from "@/components/layout/UtilityBar";
import { MainNav } from "@/components/layout/MainNav";
import { SubNav } from "@/components/layout/SubNav";
import { LiveBar } from "@/components/LiveBar";
import { SiteFooter } from "@/components/layout/SiteFooter";

type Props = {
  children: React.ReactNode;
  activeSport?: string;
  activeSub?: string;
};

export function SiteShell({ children, activeSport, activeSub }: Props) {
  return (
    <div className="min-h-screen bg-[#e8e8e8]">
      <UtilityBar />
      <MainNav activeSport={activeSport} />
      <SubNav active={activeSub} />
      <LiveBar />
      <div className="mx-auto max-w-[1600px] bg-white px-2 py-2">{children}</div>
      <SiteFooter />
    </div>
  );
}
