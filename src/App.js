import "./App.css";
import AppRoute from "./routes/AppRoute";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <div className="App">
           <ScrollToTop/>
      <AppRoute />
    </div>
  );
}

export default App;
