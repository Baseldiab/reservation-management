import { useNavigate } from "react-router-dom";

export default function LoginFooter() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center gap-1">
        <span className="text-theme-text-body text-theme-sm leading-theme-md font-medium">
          Don’t have an account ?
        </span>
        <button
          type="button"
          className="text-theme-text-primary text-theme-sm leading-theme-md font-medium"
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
