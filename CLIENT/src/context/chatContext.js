import { createContext, useContext, useReducer } from "react";
import { FirebaseAuthContext } from "./firebaseAuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { firebaseCurrentUser } = useContext(FirebaseAuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            firebaseCurrentUser.uid > action.payload.uid
              ? firebaseCurrentUser.uid + action.payload.uid
              : action.payload.uid + firebaseCurrentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
