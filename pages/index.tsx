import Layout from "@/components/layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="pb-10 text-3xl">Media</div>
        <div className="grid grid-cols-4 gap-x-7 gap-y-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
            (_, i) => (
              <Link
                key={i}
                href={{ pathname: `/media/${i}`, query: { id: i } }}
                as={`/media/${i + 1}`}
              >
                <div className="h-60 w-40 bg-blue-700 text-center text-white">
                  {i + 1}
                </div>
              </Link>
            )
          )}
          <Link href={`/media/live`}>
            <div className="h-60 w-40 bg-blue-700 text-center text-white">
              LIVE
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
