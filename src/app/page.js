import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Weird Wolf Dashboard</h1>
        <p className="text-gray-500 mt-4">
          View Amazon & Flipkart product stats updated daily.
        </p>
      </main>
    </>
  );
}
