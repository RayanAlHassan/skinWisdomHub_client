import NavBar from "../layout/NavBar/NavBar.js"
import footer from "../layout/Footer/Footer.js";
function LayoutWithHeaderFooter({ children }) {
  return (
    <>
      <div>
        <navBar/>
        {children}
        <footer/>
      </div>
    </>
  );
}

export default LayoutWithHeaderFooter;
