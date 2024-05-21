import  { ReactNode } from "react";
import { ThemeProvider } from "./components/theme-provider.tsx"
interface Props {
    children?: ReactNode
}
function ThemeChanger({children}:Props ) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {children}
        </ThemeProvider>
    )
}

export default ThemeChanger
