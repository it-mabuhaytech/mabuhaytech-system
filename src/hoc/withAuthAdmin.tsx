// hoc/withAuthAdmin.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { checkUserRoleAdmin } from "@/utils/checkAccess";

// check if authenticated and user is an admin
const withAuthAdmin = (WrappedComponent: React.FC) => {
    const AuthenticatedComponent = (props: any) => {
        const router = useRouter();

        useEffect(() => {
            const isAuthenticated = localStorage.getItem("authenticated");
            if (!isAuthenticated) {
                router.push("/login/page");
            } else if (router.route === "/login/page") {
                router.push("/");
            }

            //function to check if  user is admin
            const checkAdmin = async () => {
                const checkIfAdmin = await checkUserRoleAdmin();

                if (!checkIfAdmin) {
                    router.push("/");
                }
            };
            checkAdmin();
        }, [router]);

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuthAdmin;
