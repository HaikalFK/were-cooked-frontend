import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 py-6 dark:bg-gray-700">{children}</main>
      <Footer />
    </>
  );
}
