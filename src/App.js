import Content from "./components/content"
import { Layout } from 'antd';
import { Navbar } from "./components/navbar"

function App() {

  return (
    <Layout>
      <Navbar />
      <Content />
    </Layout>
  );
}

export default App;
