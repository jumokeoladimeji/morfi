import Image from "next/image";
import { Inter } from "next/font/google";
import ArtworkForm from '../components/ArtworkForm';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleSubmit = (formData) => {
    // Handle form submission (e.g., send data to API)
    console.log(formData);
};
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ArtworkForm />
        </div>
      </div>
    </main>
  );
}
