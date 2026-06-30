"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <div className="w-full">
      <Image
        src="/home.png"
        alt="TruBotAI Homepage"
        width={0}
        height={0}
        sizes="100vw"
        priority
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        className="w-full h-auto select-none"
        style={{ 'webkitUserDrag': 'none' } as React.CSSProperties}
      />
    </div>
  );
}
