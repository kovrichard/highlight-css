export function H2({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <h2 className="scroll-m-20 pb-2 text-2xl tracking-tight first:mt-0">
      {children}
    </h2>
  );
}
