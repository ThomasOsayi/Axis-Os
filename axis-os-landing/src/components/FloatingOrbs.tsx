export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-1" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-float-2" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500/8 rounded-full blur-3xl animate-float-3" />
    </div>
  );
}
