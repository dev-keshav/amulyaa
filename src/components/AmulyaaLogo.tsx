interface AmulyaaLogoProps {
    /** Width of the full logo. Height scales proportionally (aspect ~4.2:1). */
    width?: number;
    /** If true, renders only the compact monogram icon (square). */
    iconOnly?: boolean;
}

/**
 * Amulyaa SVG logo.
 * Full variant: A-monogram icon + wordmark.
 * Icon-only variant: compact monogram for use in tight spaces.
 */
const AmulyaaLogo = ({ width = 188, iconOnly = false }: AmulyaaLogoProps) => {
    if (iconOnly) {
        return (
            <svg
                width={44}
                height={44}
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Amulyaa monogram"
            >
                <defs>
                    <linearGradient id="monoGold" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
                        <stop offset="0%" stopColor="hsl(36,80%,92%)" />
                        <stop offset="55%" stopColor="hsl(30,72%,84%)" />
                        <stop offset="100%" stopColor="hsl(22,78%,72%)" />
                    </linearGradient>
                    <linearGradient id="monoStroke" x1="0" y1="0.5" x2="1" y2="0.5">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="hsl(22,78%,68%)" stopOpacity="0.65" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>

                {/* Left leg of A */}
                <polygon points="22,5 13,40 7,40" fill="url(#monoGold)" />
                {/* Right leg of A */}
                <polygon points="22,5 31,40 37,40" fill="url(#monoGold)" />
                {/* Crossbar — flush between inner edges of both legs at y≈23 */}
                <rect x="15" y="22.5" width="14" height="3.5" rx="1.75" fill="url(#monoGold)" />
                {/* Decorative brushstroke underline */}
                <path
                    d="M4 43 Q22 40.5 40 43"
                    stroke="url(#monoStroke)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    fill="none"
                />
            </svg>
        );
    }

    // Full logo: icon + wordmark
    const height = Math.round(width / 4.2);
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 188 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Amulyaa"
        >
            <defs>
                <linearGradient id="fullGold" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="hsl(36,80%,92%)" />
                    <stop offset="55%" stopColor="hsl(30,72%,84%)" />
                    <stop offset="100%" stopColor="hsl(22,78%,72%)" />
                </linearGradient>
                <linearGradient id="strokeFade" x1="0" y1="0" x2="44" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="hsl(22,78%,68%)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="wordGold" x1="56" y1="0" x2="188" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="hsl(36,80%,92%)" />
                    <stop offset="60%" stopColor="hsl(30,72%,86%)" />
                    <stop offset="100%" stopColor="hsl(28,68%,78%)" />
                </linearGradient>
            </defs>

            {/* ── Icon box (rounded square) ── */}
            <rect
                x="0.5" y="0.5" width="43" height="43"
                rx="11"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1"
                fill="rgba(255,255,255,0.09)"
            />

            {/* Left leg of A */}
            <polygon points="22,5 13,40 7,40" fill="url(#fullGold)" />
            {/* Right leg of A */}
            <polygon points="22,5 31,40 37,40" fill="url(#fullGold)" />
            {/* Crossbar */}
            <rect x="15" y="22.5" width="14" height="3.5" rx="1.75" fill="url(#fullGold)" />
            {/* Brushstroke under icon */}
            <path
                d="M4 43 Q22 40.5 40 43"
                stroke="url(#strokeFade)"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
            />

            {/* ── Wordmark ── */}
            {/* "Amulyaa" serif */}
            <text
                x="57"
                y="30"
                fontFamily="'Cormorant Garamond', Georgia, serif"
                fontSize="27"
                fontWeight="600"
                letterSpacing="-1.1"
                fill="url(#wordGold)"
            >
                Amulyaa
            </text>

            {/* "ORIGINAL PAINTINGS" subtitle */}
            <text
                x="58"
                y="41"
                fontFamily="'Manrope', system-ui, sans-serif"
                fontSize="6.4"
                fontWeight="600"
                letterSpacing="3.4"
                fill="rgba(240,210,178,0.46)"
            >
                ORIGINAL PAINTINGS
            </text>
        </svg>
    );
};

export default AmulyaaLogo;
