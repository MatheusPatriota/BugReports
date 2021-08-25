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

export {signinWithEmailAndPassword}