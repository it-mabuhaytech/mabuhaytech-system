import HealthChecker from '../components/HealthChecker';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <HealthChecker />
    </div>
  );
};

export default Home;
