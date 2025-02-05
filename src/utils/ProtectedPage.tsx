// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function withAuth(Component: React.ComponentType) {
//   return function ProtectedPage(props: any) {
//     const user = useSelector((state: any) => state.user.userToken);
//     const router = useRouter();

//     useEffect(() => {
//       if (!user) {
//         router.replace("/login");
//       }
//     }, [user, router]);

//     if (!user) {
//       return <p>Loading...</p>;
//     }

//     return <Component {...props} />;
//   };
// }

// export default withAuth(Dashboard);
