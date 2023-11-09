import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <main className="flex min-h-screen flex-col">
      <div
        className="flex flex-col
    xl:w-[1200px] lg:w-[1000px] lg:mx-auto w-full px-4 pt-6"
      >
        <Outlet />
      </div>
    </main>
  );
}
