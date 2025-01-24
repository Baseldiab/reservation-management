export default function Footer() {
  const yearNow = new Date().getFullYear();

  return (
    <footer className={`bg-slate-200 shadow-xl dark:bg-white/5  z-30 `}>
      <div className="container py-4 align-middle text-center relative">
        <span className="dark:text-white text-black max-sm:text-sm">{`All rights reserved Basel & Co © ${yearNow} Created by `}</span>
        <a
          className="text-blue-500 dark:text-blue-700 bold max-sm:text-sm"
          href="https://github.com/Baseldiab"
        >
          Basel Diab
        </a>
      </div>
    </footer>
  );
}
