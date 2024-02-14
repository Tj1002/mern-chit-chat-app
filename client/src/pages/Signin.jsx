import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/features/auth/userSlice";
import toast from "react-hot-toast";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data.data.user));
        toast.success("signin successful");

        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen ">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="flex flex-col text-3xl md:text-5xl font-semibold text-center text-blue-500">
          Chit-Chat
          <span className="text-gray-300"> Login</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-2/3 md:w-1/3 ">
          <div>
            <Label className="label p-2">
              <span className="text-base label-text">Email</span>
            </Label>
            <TextInput
              type="email"
              id="email"
              placeholder="Enter Email"
              onChange={handleChange}
            />
          </div>

          <div>
            <Label className="label">
              <span className="text-base label-text">Password</span>
            </Label>
            <TextInput
              type="password"
              id="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />
          </div>
          <Button className="mt-6" outline type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Dont Have an account?</span>
          <Link to="/sign-up" className="text-blue-500">
            Sign Up
          </Link>
        </div>
        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
