import Link from "next/link";
import hint from "../hint.json";
import Image from "next/image";

export default function Contact() {
	return (
		<div id="contact">
			<div className="pt-16 h-auto container my-auto mx-auto bg-black items-center justify-evenly flex-col">
				<h2 className="text-[#fff]  font-bold, text-2xl">Connect with me</h2>
				<div className="p-10 h-auto w-auto mx-auto flex flex-wrap items-center justify-center">
					{hint.socials.map(({ link, icon, label }) => (
						<div
							key={label}
							className="w-10 h-10 m-12 items-center justify-center"
						>
							<Link href={link}>
								<Image
									style={{ filter: "invert(100%)" }}
									src={icon}
									alt={label}
									width={80}
									height={80}
								/>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
