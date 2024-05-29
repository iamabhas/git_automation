import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useDispatch} from "react-redux";
import {loginUser} from "@/redux/slices/auth.slice.ts";
import {useNavigate} from "react-router";
import axios from "axios";
import configVariables from "../../config.ts";

const {serverUrl} = configVariables

const formSchema = z.object({
    githubAccessToken: z.string().min(2).max(100),
})


const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            githubAccessToken: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {

        try{
            const response = await axios.post(`${serverUrl}/api/login`,{
                githubAccessToken: values.githubAccessToken
            })
            dispatch(loginUser(response.data.data.token))
            navigate("/dashboard")
        }catch(error){
            let errorMessage = "Something went wrong !";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            console.log(errorMessage);

        }

    }
    return (
        <main className="m-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="githubAccessToken"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter your github personal access token to log in</FormLabel>
                                <FormControl>
                                    <Input placeholder="Personal Token" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please enter correct token to enter dashboard
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Log In</Button>
                </form>
            </Form>
        </main>

    );
};

export default LoginForm;
