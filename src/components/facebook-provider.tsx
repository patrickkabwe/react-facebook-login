import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";

const FacebookContext = createContext({
    loading: true,
});

export const useFacebook = () => useContext(FacebookContext);

export const FacebookProvider = ({
    appId,
    version = "v19.0",
    children,
}: PropsWithChildren<Partial<fb.InitParams>>) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const defaultConfig: fb.InitParams = {
            xfbml: true,
            version,
        };
        const script = document.createElement("script");
        script.src = `https://connect.facebook.net/en_US/sdk.js`;
        script.async = true;
        script.onload = () => {
            window.FB.init({
                appId,
                ...defaultConfig,
            });
            setLoading(false);
        };
        document.body.appendChild(script);
    }, [appId, version]);

    return (
        <FacebookContext.Provider value={{ loading }}>
            {children}
        </FacebookContext.Provider>
    );
};
