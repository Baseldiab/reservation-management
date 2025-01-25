import { useNavigate } from "react-router-dom";

export default function SignUpFooter() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center flex-wrap gap-1">
        <span className="text-theme-text-body text-theme-sm leading-theme-md font-medium">
          Already have an account ?
        </span>
        <button
          type="button"
          className="text-theme-text-primary text-theme-sm leading-theme-md font-medium"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </>
  );
}
