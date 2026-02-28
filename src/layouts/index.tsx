import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EditTransactionDialog from '../components/EditTransactionDialog';
export default function Layout() {
  return (
    <>
      <Header />
      <EditTransactionDialog />
      <Outlet />
      <Footer />
    </>
  );
}
