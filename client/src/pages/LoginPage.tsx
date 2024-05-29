import LoginForm from "@/components/appComponents/LoginForm.tsx";
const LoginPage = () => {

    return (
        <>
            <div className="flex flex-col  justify-center items-center ">
                <h1 className="text-5xl">GIT AUTOMATION</h1>
                <p className="text-2xl">Automated PR and code reviews</p>
                <LoginForm/>
            </div>

        </>
    );
};

export default LoginPage;
