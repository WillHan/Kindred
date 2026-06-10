import logo from "@/assets/kindred-logo.png.asset.json";

export function KindredLogo({
  className,
  showWordmark = true,
  size = "sm",
}: {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "lg";
}) {
  const dim = size === "lg" ? "h-16 w-16" : "h-9 w-9";
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <img
        src={logo.url}
        alt="Kindred"
        className={`${dim} rounded-full object-cover`}
        loading="lazy"
      />
      {showWordmark && (
        <span className="font-serif text-xl text-foreground">Kindred</span>
      )}
    </div>
  );
}
