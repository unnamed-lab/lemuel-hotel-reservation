import { useOutletContext } from "react-router-dom";

function Home() {
  const [setNavType, setFooterType] = useOutletContext();
  setNavType(true); //  Top navigation bar used.
  setFooterType(true); // Short form footer used

  return (
    <>
      <h2>Home page section!</h2>
    </>
  );
}

export default Home;
