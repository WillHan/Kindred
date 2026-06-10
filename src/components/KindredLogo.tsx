import mark from "@/assets/kindred-mark.png";

export function KindredLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <img
        src={mark}
        alt=""
        width={28}
        height={28}
        className="h-7 w-7"
        loading="lazy"
      />
      <span className="font-serif text-xl text-foreground">Kindred</span>
    </div>
  );
}
