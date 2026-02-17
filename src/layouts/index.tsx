import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <>
      <div>Header will be here</div>
      <Outlet />
      <div>Footer will be here</div>
    </>
  );
}
