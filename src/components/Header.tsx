import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return(
        <header className="header">
            <div className="header-inner">
                <a href="/" className="header-logo">
                    <Image
                        src="/images/logo/logo-large.png"
                        alt="Todo List 로고"
                        width={151}
                        height={40}
                        className="logo-large"
                    />

                    <Image
                        src="/images/logo/logo-small.png"
                        alt=""
                        width={71}
                        height={40}
                        className="logo-small"
                    />
                </a>
            </div>
        </header>
    );
}