import React from "react";
import { useLoginPageStyles } from "../styles";
import SEO from "../components/shared/Seo";
import {
  Card,
  CardHeader,
  TextField,
  Typography,
  Button,
  InputAdornment
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../auth";
import isEmail from "validator/lib/isEmail";
import { useApolloClient } from "@apollo/react-hooks";
import { GET_USER_EMAIL } from "../graphql/queries";
import { AuthError } from "./signup";
import GoogleButton from "react-google-button";

import "./login.css";

function LoginPage() {
  const classes = useLoginPageStyles();
  const { register, handleSubmit, watch, formState } = useForm({
    mode: "onBlur"
  });
  const { logInWithEmailAndPassword } = React.useContext(AuthContext);
  const [showPassword, setPassword] = React.useState(false);
  const hasPassword = Boolean(watch("password"));
  const history = useHistory();
  const client = useApolloClient();
  const [error, setError] = React.useState("");

  async function onSubmit({ input, password }) {
    try {
      setError("");
      if (!isEmail(input)) {
        input = await getUserEmail(input);
      }
      // console.log({ data });
      await logInWithEmailAndPassword(input, password);
      setTimeout(() => history.push("/"), 0);
    } catch (error) {
      console.error("Error logging in", error);
      handleError(error);
    }
  }

  function handleError(error) {
    if (error.code.includes("auth")) {
      setError(error.message);
    }
  }

  async function getUserEmail(input) {
    const variables = { input };
    const response = await client.query({
      query: GET_USER_EMAIL,
      variables
    });
    const userEmail = response.data.users[0]?.email || "no@email.com";
    return userEmail;
  }

  function togglePasswordVisibility() {
    setPassword(prev => !prev);
  }

  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                name="input"
                inputRef={register({
                  required: true,
                  minLength: 2
                })}
                fullWidth
                variant="filled"
                label="Username, Email, or Phone"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                name="password"
                inputRef={register({
                  required: true,
                  minLength: 6
                })}
                InputProps={{
                  endAdornment: hasPassword && (
                    <InputAdornment>
                      <Button onClick={togglePasswordVisibility}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputAdornment>
                  )
                }}
                fullWidth
                variant="filled"
                label="Password"
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
              />
              <Button
                disabled={!formState.isValid || formState.isSubmitting}
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Log In
              </Button>
            </form>
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>

            <GoogleButton
              type="light"
              className="googleSignIn"
              onClick={LoginWithGoogle()}
            />
            <AuthError error={error} />
            <Button fullWidth color="secondary">
              <Typography variant="caption">Forgot password?</Typography>
            </Button>
          </Card>
          <Card className={classes.signUpCard}>
            <Typography align="right" variant="body2">
              Don't have an account?
            </Typography>
            <Link to="/accounts/emailsignup">
              <Button color="primary" className={classes.signUpButton}>
                Sign up
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  );
}

export function LoginWithGoogle() {
  const { signInWithGoogle } = React.useContext(AuthContext);
  const [error, setError] = React.useState("");
  const history = useHistory();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
      history.push("/");
    } catch (error) {
      console.error("Error logging in with Google", error);
      setError(error.message);
    }
  }

  return () => handleSignInWithGoogle();
}

export default LoginPage;
