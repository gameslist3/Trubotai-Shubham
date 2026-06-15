import { type SVGAttributes } from "react";

interface IconProps extends SVGAttributes<SVGElement> {
  size?: number;
}

const strokeProps = {
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function AiLinkedInIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...strokeProps} {...props}>
      {/* AI sparkle star */}
      <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z" />
      {/* Small sparkle */}
      <path d="M19 3l0.5 2L21.5 6l-2 0.5L19 9l-0.5-2.5L16 6l2.5-1z" />
      {/* Connection arc (LinkedIn) */}
      <path d="M16 17a2.83 2.83 0 0 1 0 4l-4 4" />
      <path d="M16 21a2.83 2.83 0 0 1 0-4l4-4" />
      <line x1="6" y1="17" x2="13" y2="17" />
    </svg>
  );
}

export function ArchitectureIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...strokeProps} {...props}>
      {/* Columns */}
      <rect x="4" y="7" width="4" height="14" rx="0.5" />
      <rect x="10" y="7" width="4" height="14" rx="0.5" />
      <rect x="16" y="7" width="4" height="14" rx="0.5" />
      {/* Roof pediment */}
      <polyline points="2,8 12,2 22,8" />
      {/* Floor base */}
      <line x1="2" y1="21" x2="22" y2="21" />
    </svg>
  );
}

export function ProductPrdIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...strokeProps} {...props}>
      {/* Document body */}
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      {/* Fold corner */}
      <polyline points="14 2 14 8 20 8" />
      {/* Text lines */}
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="15" x2="15" y2="15" />
      <line x1="9" y1="18" x2="12" y2="18" />
    </svg>
  );
}

export function RealEstateIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...strokeProps} {...props}>
      {/* Roof */}
      <path d="M3 10l9-7 9 7" />
      {/* House body */}
      <rect x="5" y="10" width="14" height="11" rx="1" />
      {/* Door */}
      <rect x="10" y="15" width="4" height="6" rx="0.5" />
      {/* Windows */}
      <rect x="7" y="12" width="2" height="2" rx="0.3" />
      <rect x="15" y="12" width="2" height="2" rx="0.3" />
    </svg>
  );
}

/* --- Outlined-style icons for existing 5 categories --- */

export function FinanceIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...strokeProps} {...props}>
      {/* Calculator body */}
      <rect x="4" y="2" width="16" height="20" rx="2" />
      {/* Screen */}
      <rect x="6" y="5" width="12" height="4" rx="0.5" />
      {/* Buttons row 1 */}
      <rect x="6" y="11" width="3" height="2.5" rx="0.5" />
      <rect x="10.5" y="11" width="3" height="2.5" rx="0.5" />
      <rect x="15" y="11" width="3" height="2.5" rx="0.5" />
      {/* Buttons row 2 */}
      <rect x="6" y="14.5" width="3" height="2.5" rx="0.5" />
      <rect x="10.5" y="14.5" width="3" height="2.5" rx="0.5" />
      <rect x="15" y="14.5" width="3" height="2.5" rx="0.5" />
      {/* Buttons row 3 */}
      <rect x="6" y="18" width="3" height="2.5" rx="0.5" />
      <rect x="10.5" y="18" width="3" height="2.5" rx="0.5" />
    </svg>
  );
}

export function InvestorIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...strokeProps} {...props}>
      {/* Briefcase body */}
      <rect x="2" y="7" width="20" height="14" rx="2" />
      {/* Briefcase handle */}
      <path d="M9 7V4h6v3" />
      {/* People inside */}
      <circle cx="9.5" cy="14" r="2.5" />
      <circle cx="14.5" cy="14" r="2.5" />
      <circle cx="12" cy="11.5" r="2.5" />
    </svg>
  );
}

export function GrantIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...strokeProps} {...props}>
      {/* Database body */}
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      {/* Document lines */}
      <line x1="8" y1="5" x2="16" y2="5" />
      <line x1="9" y1="7.5" x2="15" y2="7.5" />
    </svg>
  );
}

export function AcceleratorIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...strokeProps} {...props}>
      {/* Rocket body - symmetrical with fins */}
      <path d="M12 2l4 6h2l-1 2h2l-1 2h2l-4 10-4-10h-4l1-2h-2l1-2h-2l6-6z" />
      {/* Window */}
      <circle cx="12" cy="7" r="1.5" />
      {/* Flame */}
      <path d="M10 22c-1 1.5-1 3.5 0 4" />
      <path d="M14 22c1 1.5 1 3.5 0 4" />
      <path d="M12 22c-0.5 1-0.5 2.5 0 3" />
    </svg>
  );
}

export function LeadsIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...strokeProps} {...props}>
      {/* Users/people group */}
      <circle cx="8" cy="8" r="3.5" />
      <circle cx="16" cy="8" r="3.5" />
      <circle cx="12" cy="14" r="3.5" />
      {/* Bodies */}
      <path d="M2.5 23c0-4.4 2.7-7 5.5-7s5.5 2.6 5.5 7" />
      <path d="M13.5 23c0-4.4 2.7-7 5.5-7s5.5 2.6 5.5 7" />
      {/* Plus badge */}
      <circle cx="20" cy="4" r="3" />
      <line x1="20" y1="2.5" x2="20" y2="5.5" />
      <line x1="18.5" y1="4" x2="21.5" y2="4" />
    </svg>
  );
}
