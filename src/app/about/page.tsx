import type { Metadata } from "next";
import { FaGithub, FaRocket, FaHeart } from "react-icons/fa";

export const metadata: Metadata = {
    title: "About Us - AniKoManga",
    description: "Learn more about the AniKoManga project, our mission, and our team.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto min-h-[calc(100vh-10rem)] px-4 py-12 text-neutral-100">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-neutral-50 sm:text-5xl md:text-6xl">
                    About <span className="text-sky-400">AniKoManga</span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-neutral-300">
                    Your personal gateway to the exciting world of manga.
                </p>
            </header>

            <main className="prose prose-invert prose-lg mx-auto max-w-3xl">
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-sky-400 mb-4 flex items-center">
                        <FaRocket className="mr-3 h-7 w-7" />
                        Our Mission
                    </h2>
                    <p>
                        AniKoManga was created out of love for manga and the desire to provide a convenient and enjoyable way to explore and read it. We strive to gather a vast collection of information about various titles, offering users tools for searching, tracking favorites, and discovering new stories.
                    </p>
                    <p>
                        Our goal is to become your reliable companion in the world of Japanese comics, offering up-to-date information and an intuitive interface.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-sky-400 mb-4 flex items-center">
                        <FaHeart className="mr-3 h-7 w-7" />
                        Why AniKoManga?
                    </h2>
                    <ul className="list-disc space-y-2 pl-5">
                        <li>
                            <strong>Extensive Database:</strong> We use the Jikan API, an unofficial API for MyAnimeList, to give you access to thousands of manga titles.
                        </li>
                        <li>
                            <strong>Convenient Search & Filtering:</strong> Find what you need with our flexible search and filtering system.
                        </li>
                        <li>
                            <strong>Personalization:</strong> Save your favorite manga to "Favorites" for quick access.
                        </li>
                        <li>
                            <strong>Modern Design:</strong> We made sure the site is pleasant and aesthetically pleasing to use.
                        </li>
                    </ul>
                </section>
                
                <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-sky-400 mb-4">
                                Technologies
                        </h2>
                        <p>
                                This project is built using modern web technologies, including:
                        </p>
                        <ul className="list-disc space-y-2 pl-5">
                                <li>Next.js (React Framework)</li>
                                <li>TypeScript</li>
                                <li>Tailwind CSS</li>
                                <li>Zustand (for state management)</li>
                                <li>Jikan API (for manga data)</li>
                                <li>And many other great libraries!</li>
                        </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-sky-400 mb-4 flex items-center">
                        <FaGithub className="mr-3 h-7 w-7" />
                        Developer
                    </h2>
                    <p>
                        AniKoManga is a project developed by <strong className="text-neutral-50">Atrofos-kaliev</strong>.
                        I am always open to suggestions and feedback! You can find the source code or contact me via GitHub.
                    </p>
                    <a
                        href="https://github.com/Atrofos-kaliev/AniKoManga" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center rounded-md bg-neutral-700 px-4 py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-600 transition-colors"
                    >
                        <FaGithub className="mr-2" />
                        View on GitHub
                    </a>
                </section>
            </main>
        </div>
    );
}
