import { createContext, useState } from "react";

export const AccountContext = createContext({
    account: "",
    setAccount: () => { },
    toggleAccount: () => { }
})

export const AccountContextProvider = (props) => {
    const [account, setAccount] = useState('');

    const toggleAccount = () => {
        if (account === 'Pro') {
            setAccount('');
        } else {
            setAccount('Pro')
        }
    }

    return (
        <AccountContext.Provider value={{ account, setAccount, toggleAccount }}>
            {props.children}
        </AccountContext.Provider>
    )
}