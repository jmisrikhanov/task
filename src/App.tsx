import "./App.module.scss";
import { Layout } from "./components/layout/Layout";
import SearchPage from "./components/search-page/SearchPage";

function App() {
  return (
    <Layout>
      <h1>Github User Finder</h1>
      <SearchPage />
    </Layout>
  );
}

export default App;
