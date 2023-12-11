function Navbar({ navState }) {
  const nav = navState ? <NavTop /> : <NavSide />;
  return (
    <>
      <h2>Navigation bar.</h2>
      {nav}
    </>
  );
}

function NavTop() {
  return (
    <>
      <h2>Top navigation.</h2>
    </>
  );
}

function NavSide() {
  return (
    <>
      <h2>Side navigation.</h2>
    </>
  );
}
export default Navbar;
