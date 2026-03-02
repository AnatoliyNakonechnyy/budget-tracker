import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EditTransactionDialog from '../components/EditTransactionDialog';
import FilterDialog from '../components/FilterDialog';
import SortDialog from '../components/SortDialog';
export default function Layout() {
  return (
    <>
      <Header />
      <EditTransactionDialog />
      <FilterDialog />
      <SortDialog />
      <Outlet />
      <Footer />
    </>
  );
}
