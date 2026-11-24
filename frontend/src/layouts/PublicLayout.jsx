import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ScrollProgressBar from '../components/common/ScrollProgressBar';
import BackToTopButton from '../components/common/BackToTopButton';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D12] text-slate-100">
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <BackToTopButton />
      <Footer />
    </div>
  );
}