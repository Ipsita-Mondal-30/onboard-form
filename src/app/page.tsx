import { Hero } from "../../components/Hero"; // Cleaned up import
import BoardingForm from "../../components/onboarding/BoardingForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="block bg-slate-200/40 z-10  -mt-36 overflow-hidden h-screen">
      <BoardingForm/>
      </div>
    </main>
  );
}
