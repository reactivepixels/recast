import { Header, Main } from "@/app/components/compounds";
import WhatIsRecast from "./sections/WhatIsRecast";
import { ButtonNewYork } from "./components/elements/ButtonNewYork";

export default function Home() {
  return (
    <>
      <Header />
      <Main>
        <ButtonNewYork>New York, New York</ButtonNewYork>
        <WhatIsRecast />
      </Main>
    </>
  );
}
