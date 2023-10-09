"use client";
import { useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
const initialErrorState = {
  emailError: "",
  passwordError: "",
  nameError: "",
  country_codeError: "",
};

export default function Form() {
  const session = useSession();
  const [variants, setVariants] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    name: "",
    country_code: "",
  });
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    nameError: "",
    country_codeError: "",
  });
  const router = useRouter();

  const formValidation = () => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const country_codeRegex: RegExp = /^\+\d{1,3}$/;
    let isValid = true;
    if (variants == "REGISTER") {
      if (!emailRegex.test(userInfo.email)) {
        setError((prev) => ({ ...prev, emailError: "Invalid Email" }));
        isValid = false;
      }
      if (userInfo.email == "") {
        setError((prev) => ({ ...prev, emailError: "This field is required" }));
        isValid = false;
      }
      if (userInfo.password.length < 8) {
        setError((prev) => ({ ...prev, passwordError: "Invalid Password" }));
        isValid = false;
      }
      if (userInfo.password == "") {
        setError((prev) => ({
          ...prev,
          passwordError: "This field is required",
        }));
        isValid = false;
      }
      if (userInfo.name.length < 3) {
        setError((prev) => ({ ...prev, nameError: "Invalid Name" }));
        isValid = false;
      }
      if (userInfo.name == "") {
        setError((prev) => ({ ...prev, nameError: "This field is required" }));
        isValid = false;
      }
      if (!country_codeRegex.test(userInfo.country_code)) {
        setError((prev) => ({
          ...prev,
          country_codeError: "Invalid Country Code",
        }));
        isValid = false;
      }
      if (userInfo.country_code == "") {
        setError((prev) => ({
          ...prev,
          country_codeError: "This field is required",
        }));
        isValid = false;
      }
    } else {
      if (userInfo.email === "") {
        setError((prev) => ({
          ...prev,
          emailError: "Please enter your email",
        }));
        isValid = false;
      }
      if (userInfo.password === "") {
        setError((prev) => ({
          ...prev,
          passwordError: "Please enter your password",
        }));
        isValid = false;
      }
    }
    return isValid;
  };

  async function handleSubmit() {
    const isValid = formValidation();
    if (!isValid) {
      return;
    }
    if (variants == "LOGIN") {
      toast.loading("Sing In...", { id: "loading" });
      await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        redirect: false,
      }).then((res) => {
        toast.dismiss("loading");
        res?.ok
          ? toast.success("Sing In Successfully")
          : toast.error("Invalid Credentials");
      });
    } else {
      await toast.promise(
        axios.post("/api/register", userInfo).then(() =>
          signIn("credentials", {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false,
          })
        ),
        {
          loading: "Sing Up...",
          success: "Sing Up Successfully",
          error: (error) => {
            return error.response.data;
          },
        }
      );
    }
  }
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/users");
      router.refresh();
    }
  }, [session?.status, router]);
  return (
    <motion.div
      layout
      transition={{ duration: 0.075, type: "tween" }}
      className={`w-full sm:max-w-lg max-w-xl p-10 h-max flex flex-col gap-4 rounded-2xl text-center ${
        variants == "LOGIN" ? "mt-20" : "mt-6"
      }`}
    >
      <h1 className="text-5xl font-bold mx-auto relative after:content-[''] after:absolute after:h-1 after:w-0 after:bg-foreground after:bottom-0 after:-translate-y-1/3 after:left-0 hover:after:w-full after:transition-all">
        {variants == "LOGIN" ? "Login" : "Register"}
      </h1>
      <Input
        name="Email"
        placeholder="Enter your email"
        type="email"
        onFocus={() => {
          setError({ ...error, emailError: "" });
        }}
        value={userInfo.email}
        setValue={(value) => {
          setUserInfo({ ...userInfo, email: value });
        }}
        error={error.emailError !== ""}
        errorText={error.emailError}
      />
      {variants == "REGISTER" && (
        <>
          <Input
            name="Name"
            placeholder="Enter your name"
            type="text"
            onFocus={() => {
              setError({ ...error, nameError: "" });
            }}
            value={userInfo.name}
            setValue={(value) => {
              setUserInfo({ ...userInfo, name: value });
            }}
            error={error.nameError !== ""}
            errorText={error.nameError}
          />
          <Input
            name="Country Code"
            placeholder="Enter your country code"
            type="text"
            onFocus={() => {
              setError({ ...error, country_codeError: "" });
            }}
            value={userInfo.country_code}
            setValue={(value) => {
              setUserInfo({ ...userInfo, country_code: value });
            }}
            error={error.country_codeError !== ""}
            errorText={error.country_codeError}
          />
        </>
      )}

      <Input
        name="Password"
        placeholder="Enter your password"
        type="password"
        onFocus={() => {
          setError({ ...error, passwordError: "" });
        }}
        value={userInfo.password}
        setValue={(value) => {
          setUserInfo({ ...userInfo, password: value });
        }}
        error={error.passwordError !== ""}
        errorText={error.passwordError}
      />
      <div className="mx-auto flex relative w-full mt-4">
        <h1 className="text-lg text-foreground/50 mx-auto bg-white dark:bg-background p-1 relative z-10">
          {variants == "LOGIN"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span
            className="px-1 hover:font-bold text-foreground/50 hover:text-foreground transition-all duration-300 hover:underline cursor-pointer"
            onClick={() => {
              setVariants((prev) => (prev == "LOGIN" ? "REGISTER" : "LOGIN"));
              setError(initialErrorState);
            }}
          >
            {variants == "LOGIN" ? "Register" : "Login"}
          </span>
        </h1>
        <div className="w-full h-[2px] bg-foreground/30 absolute top-1/2 left-0"></div>
      </div>
      <Button className="text-xl my-2" variant="default" onClick={handleSubmit}>
        {variants == "LOGIN" ? "Login" : "Register"}
      </Button>
    </motion.div>
  );
}
