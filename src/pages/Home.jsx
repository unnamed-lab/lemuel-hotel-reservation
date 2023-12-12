import { useOutletContext } from "react-router-dom";

function Home() {
  const [setFooterType] = useOutletContext();
  setFooterType(true);
  // Short form footer used when true, long form footer is used when false.

  return (
    <>
      <h2>Home page section!</h2>
    </>
  );
}

export default Home;
