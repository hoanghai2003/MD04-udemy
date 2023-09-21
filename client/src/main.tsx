import ReactDOM from "react-dom/client";
import App from "./App";
import Globalstyle from "./components/Globalstyle/Globalstyle";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Globalstyle>
      <App />
    </Globalstyle>
  );
}
