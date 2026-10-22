import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFE4EF",
          borderRadius: 40,
        }}
      >
        <svg width="96" height="96" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 25s-7.2-4.4-9.6-8.2C4.4 13.8 5 10.2 7.8 9c2-.9 4.1.1 5.2 1.8C14.1 9.1 16.2 8.1 18.2 9c2.8 1.2 3.4 4.8 1.4 7.8C17.2 20.6 16 25 16 25z"
            fill="#FF7EB3"
          />
        </svg>
      </div>
    ),
    size,
  );
}
