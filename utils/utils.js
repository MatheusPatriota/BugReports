import emailjs from 'emailjs-com';
import swal from 'sweetalert';

/**
 * funcao responsavel por enviar o email para o usuário, podendo ser de confirmacao ou alteracao de status
 * @param {*} template_params parametros necessarios para enviar o email com as informacoes corretas
 */
function sendEmail(template_params){
  emailjs
  .send(
    'service_qk3iplp',
    'template_bugReports',
    template_params,
    'user_JPO0dwMhpoUMtAJlAk4m8',
  )
  .then(
    function (response) {
      console.log('SUCCESS!', response.status, response.text);
      swal(
        'Ocorrencia cadastrada com Sucesso',
        'Enviamos um email confirmando Sua nova Ocorrência =D',
        'success',
      );
    },
    function (error) {
      console.log('FAILED...', error);
      swal('Erro ao enviar Email', `${error.message}`, 'error');
    },
  );
}

export {sendEmail}


