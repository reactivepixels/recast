import { Header, Main } from "@/app/components/compounds";
import WhatIsRecast from "./sections/WhatIsRecast";

export default function Home() {
  return (
    <>
      <Header />
      <Main>
        <WhatIsRecast />
      </Main>
    </>
  );
}
