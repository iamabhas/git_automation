import LoginForm from "@/components/appComponents/LoginForm.tsx";
const LoginPage = () => {

    return (
        <>
        <div className="flex flex-col  justify-center items-center ">
            <h1 className="text-2xl">Login with Github Access Token</h1>
            <LoginForm/>
        </div>

        </>
    );
};

export default LoginPage;
