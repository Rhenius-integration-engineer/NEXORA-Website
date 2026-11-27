type BrandMarkProps = { compact?: boolean; light?: boolean; className?: string };

export function BrandMark({ compact = false, light = false, className = "" }: BrandMarkProps) {
  const ink = light ? "#F7F1E3" : "#0B5D46";
  return (
    <span className={`brand-lockup ${compact ? "brand-lockup--compact" : ""} ${className}`}>
      <svg className="brand-crest" viewBox="0 0 64 72" role="img" aria-label="NEXORA shield mark">
        <path d="M32 3 39 10 47 9 47 15 57 18 57 45 52 55 32 68 12 55 7 45 7 18 17 15 17 9 25 10Z" fill="none" stroke={ink} strokeWidth="2.2" />
        <path d="M22 15 27 9 32 14 37 9 42 15" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 25V48L42 25V48" fill="none" stroke={ink} strokeWidth="5.2" strokeLinecap="square" strokeLinejoin="miter" />
        <path d="M14 54 32 64 50 54" fill="none" stroke="#D4AF37" strokeWidth="1.4" />
      </svg>
      {!compact && (
        <span className="brand-type">
          <span className="brand-name" style={{ color: ink }}>NEXORA</span>
          <span className="brand-descriptor" style={{ color: ink }}>BUSINESS SOLUTIONS &amp; GROWTH</span>
        </span>
      )}
    </span>
  );
}
