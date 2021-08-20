import { ButtonHTMLAttributes } from "react";
import {ButtonStyle} from "./styles";

//tipagem do butao
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &{
  isOutlined?: boolean;
}

/**
 * funcao reponsavel por criar um componente botão persolnalizado
 * @param param0 propiedades herdadas da pagina
 * @returns retorna um botao formatado com html css e js
 */
export function Button({isOutlined = false, ...props}: ButtonProps){
  return <ButtonStyle className={`${isOutlined ? 'outlined': ''} `} {...props} />;}
