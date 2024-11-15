// hoc/withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: React.FC) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem('authenticated');
      if (!isAuthenticated) {
        router.push('/login/page');
      } else if (router.route === "/login/page"){
        router.push('/');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
