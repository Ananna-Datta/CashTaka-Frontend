import loginimg from "@/assets/images/Authentication/register.png";
import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";
import { GalleryVerticalEnd } from "lucide-react";

const register = () => {
    return (
        <div className="grid min-h-svh lg:grid-cols-5">


      {/* Form Side (40%) */}
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-[#733E0A] lg:col-span-2">
        {/* Logo + Branding */}
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            CashTaka
          </a>
        </div>

        {/* Login Form */}
        <div className="flex flex-1 items-center justify-center lg:ml-40">
          <div className="w-full h-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block lg:col-span-3">
        <img
          src={loginimg}
          alt="Login"
          className="absolute inset-0 h-full w-full object-contain bg-[#733E0A]"
        />
      </div>
    </div>
    );
};

export default register;