export function H1({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <h1 className="scroll-m-20 text-4xl font-bold lg:text-5xl">
      {children}
    </h1>
  );
}
