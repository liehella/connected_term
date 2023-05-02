import Layout from "@/components/layout";
import Link from "next/link";

const test = <div className="h-60 w-40 bg-blue-700"></div>;

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="pb-10 text-3xl">movies</div>
        <div className="grid grid-cols-4 gap-x-10 gap-y-10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
            <Link key={i} href={`/movies/${i}`}>
              <div>{test}</div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
