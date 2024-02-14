import { Button } from "flowbite-react";
import { BsChatHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className=" container flex flex-col justify-center items-center dark:text-white h-screen">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center justify-center ">
          <span className="font-bold text-2xl md:4xl text-nowrap">
            Welcome to{" "}
            <span className="text-blue-600 text-4xl md:text-5xl">
              Chit-Chat
            </span>
            app
          </span>
        </div>
        <div>
          <span className="text-sm font-semibold text-wrap">
            A simple and secure way to stay connected with your friends and
            family
          </span>
        </div>
        <Button outline className="mx-8">
          <Link
            to="/sign-in"
            className="flex items-center justify-center gap-2 text-lg"
          >
            <span>Start Messaging</span>
            <span>
              <BsChatHeartFill />
            </span>
          </Link>
        </Button>
        <div className="flex items-center">
          <span>Don't have an account? </span>
          <Link to="sign-up" className="text-blue-600">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
