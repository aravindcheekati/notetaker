import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <main className="w-full max-w-[1000px] min-h-screen mx-auto my-2 rounded-md shadow bg-white">
        <header>
          <Navbar />
        </header>
        <section className="px-4 py-4">{children}</section>
      </main>
    </>
  );
};

export default Layout;
