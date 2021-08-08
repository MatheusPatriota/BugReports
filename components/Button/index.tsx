import { ButtonHTMLAttributes } from "react";
import {ButtonStyle} from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &{
  isOutlined?: boolean;
}

export function Button({isOutlined = false, ...props}: ButtonProps){
  return <ButtonStyle className={`${isOutlined ? 'outlined': ''} `} {...props} />;}
