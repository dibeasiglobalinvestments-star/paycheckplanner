export default function Logo() {
  return (
    <div
      style={{
        height: "80px", // fixed container (prevents layout shift)
        display: "flex",
        alignItems: "center",
        overflow: "visible",
      }}
    >
      <img
        src="/logo.png"
        alt="Paycheck Planner"
        style={{
          height: "125%", // 25% larger
          width: "auto",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  )
}