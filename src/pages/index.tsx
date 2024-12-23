import Layout from '../components/layout';
import withAuth from '../hoc/withAuth';
import 'dotenv/config';

const Home: React.FC = () => {
  return (
    <div>
       <Layout>
          <h1 className="text-2xl">Welcome to My Website</h1>
          <p>This is the main content area. Click the menu to load components.</p>
      </Layout>
    </div>  
  );
};

export default withAuth(Home);