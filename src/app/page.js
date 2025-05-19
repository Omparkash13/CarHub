import Image from "next/image";
import CarList from "./components/CarList";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <CarList/>
    </div>
  );
}
