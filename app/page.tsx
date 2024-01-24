import Navbar from "@/components/Navbar";
import TitleEditor from "@/components/TitleEditor";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4">
      <Navbar />
      <TitleEditor />
    </div>
  );
}
