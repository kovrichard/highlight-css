export function CssKey({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <span className="text-[#66d9ef]">  {children}</span>
      <span className="text-white">: </span>
    </>
  );
}
