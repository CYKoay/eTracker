import { auth } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Login";

const Home = () => {
  const [user] = useAuthState(auth);
  console.log(user);

  if (!user) {
    return <Login />;
  }
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
