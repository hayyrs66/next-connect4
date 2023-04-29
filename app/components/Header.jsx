import Link from "next/link";
import { logo, github } from "@/public";
import Image from "next/image";

const link = 
  {
    label: "Home",
    route: "/",
  }
;

const link2 =  {
  label: "Ranking",
  route: "/ranking",
}

export const Header = () => {
  return (
    <header
      className="flex px-4 py-3 items-center justify-between border-b-[1px] border-gray-100
    bg-white/20 backdrop-blur-md"
    >
      <div>
        <Link href={link.route}>
          <Image src={logo} width={140} height={50} alt="connect4" />
        </Link>
      </div>
      <div className="flex gap-3">
        <div className="bg-white rounded-md shadow py-1 px-2 flex items-center justify-center transition duration-300 ease-in-out cursor-pointer hover:bg-gray-100">
          <a
            href="https://github.com/hayyrs66"
            target="_blank"
            rel="noreferrer"
            className="flex justify-center items-center gap-1"
          >
            <Image src={github} width={25} height={25} alt="github" />
            <span>Source</span>
          </a>
        </div>
        <div>
          <Link href={link2.route}>
            <button className="transition-all bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Ranking
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
