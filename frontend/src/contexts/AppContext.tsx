//For adding popUp messages after completing some work
import { useQuery } from "react-query";
import React, { useContext, useState } from "react";
import * as apiClient from "../api-client";
import Toast from "../components/Toast";


type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn : boolean;
};
// for when gets in website for the first time it gets no toast message
const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

    const { isError } = useQuery("validateToken",apiClient.validateToken,{
        retry : false,
    })

    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    console.log(toastMessage);
                    setToast(toastMessage);
                },
                isLoggedIn : !isError
            }}>
            {toast && (<Toast message={toast.message}
                type={toast.type}
                onClose={() => setToast(undefined)}
            />)}
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
}