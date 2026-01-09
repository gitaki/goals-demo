import { GoalProvider } from './context/GoalContext';
import Layout from './components/Layout';
import GoalsList from './components/GoalsList';
import './index.css';

function App() {
  return (
    <GoalProvider>
      <Layout>
        <GoalsList />
      </Layout>
    </GoalProvider>
  )
}

export default App;
