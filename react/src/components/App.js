import React, { useEffect, useState } from "react";
import Sawo from "sawo";
import styles from "./styles";
import Main from "../components/Main";

function App() {
  const [userPayload, setUserPayload] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const sawoConfig = {
      containerID: "sawo-container",
      identifierType: "email",
      apiKey: "d82e384f-5bcb-4b59-badb-3653c6a7fc23",
      onSuccess: onSuccessLogin
    };
    let sawo = new Sawo(sawoConfig)

    sawo.showForm();
  }, [])

  const onSuccessLogin = async(payload) => {
    setUserPayload(payload);
    setIsLoggedIn(true);
  }

  return (
    <React.Fragment>
      
      <div style={styles.containerStyle}>
        <section>
          <h1 style={styles.headingStyle}>Cryptocurrency Alert App</h1>
          {/* Showing Successful login message */}
          {isLoggedIn && (
            
              /*
              <div style={styles.loggedin}>
                <h2>User Successfull login</h2>
                <div>UserId: {userPayload.user_id}</div>
                <div>Verification Token: {userPayload.verification_token}</div>
              </div>
              */
              
              <React.Fragment>
              <div>
                <Main EmId={userPayload.identifier} />
              </div>
              </React.Fragment>
          )}

          {/* Showing login form */}
          {
            !isLoggedIn && (
              <div style={styles.formContainer} id="sawo-container">
                {/* Sawo form will appear here */}
              </div>
          )}
        </section>
      </div>
    </React.Fragment>
  );
}

export default App;
