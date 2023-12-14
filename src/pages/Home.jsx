import { useOutletContext } from "react-router-dom";

function Home() {
  const [setFooterType] = useOutletContext();
  setFooterType(true);
  // Short form footer used when true, long form footer is used when false.

  return (
    <>
      
      <main>
        <h1>Main content here!</h1>
      </main>
    </>
  );
}

export default Home;
