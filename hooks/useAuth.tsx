import { useContext } from "react";

import AuthContex from "../context/AuthContex";

const useAuth = () => useContext(AuthContex);

export default useAuth;
