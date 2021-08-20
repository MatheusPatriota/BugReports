import { Aside } from "./styles";

/**
 * componente responsavel por modularizar nossa side bar
 * @returns retorna um component formatado com html css e js
 */
function AsideLogin() {
  return (
    <>
      <Aside >
        <img src="/ilustration.svg" alt="Ilustração menu principal" />
        <strong>Crie uma nova ocorrência sobre um de nossos Produtos</strong>
        <p>Encontrou algum bug no sistema? Avisa que nossos Dev's resolvem 🧑🏼‍💻🖖🏻😄</p>
      </Aside>
    </>
  );
}

export default AsideLogin;
