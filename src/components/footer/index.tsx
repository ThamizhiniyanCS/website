const Footer = () => {
  const date = new Date();

  return (
    <footer className="flex min-h-40 flex-col items-center py-10">
      <p className="hidden text-xs tracking-widest text-slate-500 md:block">
        Designed & Developed by{" "}
        <span className="text-primary text-base leading-[.5rem]">
          Thamizhiniyan C S
        </span>{" "}
        Copyrights &#169; {date.getFullYear()}
      </p>

      <div className="mt-3 flex w-full flex-col items-center md:hidden">
        <p className="text-xs tracking-widest text-slate-500">
          Designed & Developed by
        </p>
        <p className="text-primary leading-[.5rem]">Thamizhiniyan C S</p>
        <p className="text-xs tracking-widest text-slate-500">
          Copyrights &#169; {date.getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
