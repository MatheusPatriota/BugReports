import { createContext, useEffect, useState } from 'react';
import Router from 'next/router';
import firebase from '../lib/firebase';
import cookie from 'js-cookie';

const AuthContext = createContext();

const formatUser = async (user) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  token: user.za,
  provider: user.providerData[0].providerId,
  photoUrl: user.photoUrl,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (currentUser) => {
    console.log(currentUser);
    if (currentUser) {
      const formatedUser = await formatUser(currentUser);
      setUser(formatedUser);
      setSession(true);
      return formatedUser;
    } else {
      setUser(false);
      setSession(false);
      return false;
    }
  };

  const setSession = (session) => {
    if (session) {
      cookie.set('user-auth', session, {
        expires: 1,
      });
    } else {
      
      cookie.remove('user-auth');
      Router.push('./')
    }
  };

  const signinWithGoogle = async () => {
    try {
      const provider = await new firebase.auth.GoogleAuthProvider();

      setLoading(true);
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then((response) => {
          handleUser(response.user);
          Router.push('./room-code');
        })
        .catch((error) => {
          console.log(error);
        });
    } finally {
      setLoading(false);
    }
  };

  const signinWithEmailAndpassword = async (email, password) => {
    try {
      setLoading(true);

      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          handleUser(response.user);
          Router.push('./admin/room');
        })
        .catch((error) => {
          console.log(error);
        });
    } finally {
      setLoading(false);
    }
  };
  const signout = async () => {
    try {
      
      return await firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
        setSession(false);
        Router.push('./');
        });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  },[])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signinWithGoogle,
        signinWithEmailAndpassword,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
