import { createContext, useEffect, useState } from 'react';
import Router from 'next/router';
import firebase from '../lib/firebase';
import cookie from 'js-cookie';
import swal from 'sweetalert';

//funcao para criar um contexto
const AuthContext = createContext();

//formato de saida de um usuario
const formatUser = async (user) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  token: user.za,
  provider: user.providerData[0].providerId,
  photoUrl: user.photoURL,
});

/**
  * funcao responsavel por realizar autenticacao de login do administrador do sistema
  * @param {*} email email do usuario administrador
  * @param {*} password senha do usuario administrador
  */
async function signinWithEmailAndPassword(email, password) {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        cookie.set('admin-auth', true, {
          expires: 1,
        });
        cookie.remove('user-auth');
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
        } else {
          swal(
            'Usuário não Existe',
            'Esse usuário não existe na nossa base de dados!',
            'error',
          );
        }
        console.log(error);
      });
  } catch (e){
    console.log(e.message)
  }
};

/**
 * funcao responsavel por desconectar o usuário logado
 * @returns boolean confirmando se o usuario foi desconectado ou nao
 */
const signout = async () => {
  try {
    return await firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
        // setSession(false);
        Router.push('./');
      });
  } finally {
    setLoading(false);
  }
};

/**
 * funcao responsavel por fazer a autenticacao do usuario
 * @param {*} param0 propiedades herdadas da pagina
 * @returns retorna um provider para ser o padrao carregado pela pagina
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * funcao responsavel por retornar as informacoes do usuario formatadas para a definicao acima
   * @param {*} currentUser informacoes do usuario que esta fazendo a requisicao
   * @returns boolean para saber se existe usuario conectado ou nao
   */
  const handleUser = async (currentUser) => {
    if (currentUser) {
      // console.log(currentUser)
      const formatedUser = await formatUser(currentUser);
      setUser(formatedUser);
      // setSession(true);
      // return formatedUser;
      return true;
    } else {
      setUser(false);
      // setSession(false);
      return false;
    }
  };

  // const setSession = (session) => {
  //   if (session) {
  //     cookie.set('user-auth', session, {
  //       expires: 1,
  //     });
  //   } else {
  //     cookie.remove('user-auth');
  //     // Router.push('./')
  //   }
  // };

  /**
   * funcao responsavel por chamar a API do google para realizar Login
   */
  const signinWithGoogle = async () => {
    try {
      const provider = await new firebase.auth.GoogleAuthProvider();

      setLoading(true);
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then((response) => {
          cookie.set('user-auth', true, {
            expires: 1,
          });
          cookie.remove('admin-auth');
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
        signinWithEmailAndPassword,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;
export { signinWithEmailAndPassword }
export default AuthContext;
