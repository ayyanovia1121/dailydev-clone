import Image from 'next/image';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';

const LoginPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <div className="hidden lg:flex justify-center items-center h-screen">
        <Image
          src="/auth_img.svg"
          alt="auth_img"
          width={500}
          height={500}
          className="w-full object-contain"
        />
      </div>
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="flex flex-col justify-start items-start mb-6 w-full lg:w-[500px] px-4">
          <Image src="/logo.svg" width={150} height={150} alt="logo" />
          <h1 className="text-cabbage font-bold text-2xl lg:text-3xl mt-2 ">
            Where developers suffer together
          </h1>
        </div>
        <Tabs defaultValue="login" className="w-full px-4 lg:w-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <Login />
          <Register />
        </Tabs>
      </div>
    </div>
  );
}

export default LoginPage