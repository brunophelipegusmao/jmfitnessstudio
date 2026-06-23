import PlanCard from "./plan-card";
import SubtitleH2 from "./subtitle-h2";

export default function SectionPlan() {
  return (
    <section
      className="mt-10"
      aria-label="apresentação dos planos da JM Fitness Studio"
    >
      <div className="flex flex-col items-center justify-center">
        <SubtitleH2>Venha treinar conosco!</SubtitleH2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mt-7">
          <PlanCard plan="free" />
          <PlanCard plan="guest" />
          <PlanCard plan="master" />
        </div>
      </div>
    </section>
  );
}
