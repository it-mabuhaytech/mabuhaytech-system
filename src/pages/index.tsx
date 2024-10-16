import HealthChecker from '../components/HealthChecker';
import LandingPage from '../components/LandingPage';
import { WelcomePage } from './components/welcome-page';
import Layout from '../pages/components/layout';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Layout children={undefined} />
    </div>
  );
};

export default Home;