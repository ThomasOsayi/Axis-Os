export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-float-1 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.10) 0%, rgba(34,211,238,0.04) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full animate-float-2 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.10) 0%, rgba(37,99,235,0.04) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full animate-float-3 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.03) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}