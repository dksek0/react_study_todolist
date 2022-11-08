import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Todo from './pages/Todo';

function App() {
  return (
    <Layout>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </HashRouter>
    </Layout>
  );
}

export default App;
