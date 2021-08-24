// test-utils.js
import { render } from "@testing-library/react";
import AuthContext from "../context/AuthContex";

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }) => {
  return (
    <AuthContext.Provider>
      children;
    </AuthContext.Provider>)
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };