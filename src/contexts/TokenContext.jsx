import { createContext, useEffect } from "react";

const TokenContext = createContext({
  token: null
});

export default TokenContext;
