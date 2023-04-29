import { Button } from "./components/Button";
import { GeneralButton } from "./components/GeneralButton";
import "../style/test.css";

export default function Home() {
  return (
    <main className="full-height-adjusted"> {/* Agregado 'full-height-adjusted' */}
      <section className="px-[5rem] w-full h-full flex flex-col gap-[10rem] justify-center items-center">
        <div className="">
          <div className="center">
            <h1>
              <span>Connect4</span>
              <span>Connect4</span>
              <span>Connect4</span>
            </h1>
          </div>
        </div>
        <div className="flex gap-3">
          <Button />
          <GeneralButton />
        </div>
      </section>
    </main>
  );
}
