import { createContext, useEffect, useState } from 'react';
import Router from 'next/router';
import firebase from '../lib/firebase';
import cookie from 'js-cookie';
import swal from 'sweetalert';

const AuthContext = createContext();

const formatUser = async (user) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  token: user.za,
  provider: user.providerData[0].providerId,
  photoUrl: user.photoURL,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (currentUser) => {
    if (currentUser) {
      // console.log(currentUser)
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
      // Router.push('./')
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
          swal(
            'Login Bem sucessido',
            'Você será redirecionado para a Dashboard',
            'success',
          );
          handleUser(response.user);
          Router.push('./admin/dashboard');
        })
        .catch((error) => {
          if (error.message === 'The email address is badly formatted.') {
            swal(
              'Formato de Email errado!',
              'O email que foi inserido é invalido, por favor tente novamente! (Ex.: email@email.com)',
              'error',
            );
          } else if (
            error.message ===
            'The password is invalid or the user does not have a password.'
          ) {
            swal(
              'Senha incorreta',
              'Senha está incorretos, por favor tente novamente!',
              'error',
            );
          }else{
            swal(
              'Usuário não Existe',
              'Esse usuário não existe na nossa base de dados!',
              'error',
            );
          }

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
  }, []);

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
