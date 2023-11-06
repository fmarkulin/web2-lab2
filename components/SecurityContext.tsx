import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useState,
} from "react";

interface MyContextType {
  secure: boolean;
  setSecure: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

const MyProvider: FunctionComponent = ({ children }: PropsWithChildren<{}>) => {
  const [secure, setSecure] = useState<boolean>(false);

  return (
    <MyContext.Provider value={{ secure, setSecure }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
