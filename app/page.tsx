import Image from "next/image";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LinkkForm from "@/components/LinkForm";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <LinkkForm/>
    </main>
  );
}
