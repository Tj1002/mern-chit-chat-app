import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.error);
        toast.error(data.message);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        toast.success("signup successful");
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen ">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-5xl font-semibold text-center text-blue-500 flex flex-col">
          Chit-Chat <span className="text-gray-300"> Signup</span>
        </h1>

        <form onSubmit={handleSubmit} className="flex-flex-col w-1/3 ">
          <div>
            <Label>
              <span className="text-base label-text">Full Name</span>
            </Label>
            <TextInput
              type="text"
              name="fullName"
              placeholder="John Doe"
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>
              <span className="text-base label-text">Username</span>
            </Label>
            <TextInput
              type="text"
              id="username"
              name="username"
              placeholder="johndoe"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>
              <span className="text-base label-text">Email</span>
            </Label>
            <TextInput
              type="email"
              name="email"
              placeholder="johndoe"
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>
              <span className="text-base label-text">Password</span>
            </Label>
            <TextInput
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>
              <span className="text-base label-text">Confirm Password</span>
            </Label>
            <TextInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row gap-4">
            <div>
              <Label>
                <span className="text-base label-text">Male</span>
              </Label>
              <TextInput
                color="radio"
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>
                <span className="text-base label-text">Female</span>
              </Label>
              <TextInput
                color="radio"
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button
            className="mt-6 w-full"
            outline
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Signup"
            )}
          </Button>
        </form>

        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}

        <div className="flex gap-2 text-sm mt-5">
          <span>Already have an account?</span>
          <Link to="/sign-in" className="text-blue-500">
            SignIn
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
