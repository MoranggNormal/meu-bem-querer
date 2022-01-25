import Image from "next/image";
import logo from "../../assets/images/mb.png";

export default function Logo({ width, height }) {
 return <Image src={logo.src} width={width} height={height} alt="Meu Bem-querer" />;
}
