import { useNavigate } from "react-router-dom";

export default function LoginFooter() {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative w-full flex justify-center items-center">
        <span className="w-full h-[1px] bg-theme-separating-separator absolute top-1/2 z-10"></span>
        <span className="w-8 py-1 px-2 bg-theme-main-white z-10 rounded-full flex items-center justify-center text-theme-text-body font-medium">
          Or
        </span>
      </div>

      <div className="flex items-center justify-center gap-1">
        <span className="text-theme-text-body text-theme-sm leading-theme-md font-medium">
          No account?
        </span>
        <button
          type="button"
          className="text-theme-buttons-primary text-theme-sm leading-theme-md font-medium"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign up
        </button>
      </div>
    </>
  );
}
