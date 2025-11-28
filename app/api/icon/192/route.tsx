import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)",
          borderRadius: "38px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            left: "-20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />

        {/* Main card */}
        <div
          style={{
            position: "absolute",
            width: "128px",
            height: "100px",
            background: "linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)",
            borderRadius: "12px",
            top: "38px",
            left: "32px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        />

        {/* Content lines */}
        <div
          style={{
            position: "absolute",
            width: "54px",
            height: "6px",
            background: "#E5E7EB",
            borderRadius: "3px",
            top: "55px",
            left: "48px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "75px",
            height: "6px",
            background: "#D1D5DB",
            borderRadius: "3px",
            top: "68px",
            left: "48px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "44px",
            height: "6px",
            background: "#E5E7EB",
            borderRadius: "3px",
            top: "81px",
            left: "48px",
          }}
        />

        {/* Checkbox checked */}
        <div
          style={{
            position: "absolute",
            width: "14px",
            height: "14px",
            background: "#10B981",
            borderRadius: "3px",
            top: "100px",
            left: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            color: "white",
          }}
        >
          ✓
        </div>

        {/* Checkbox unchecked */}
        <div
          style={{
            position: "absolute",
            width: "14px",
            height: "14px",
            background: "#F3F4F6",
            border: "1px solid #D1D5DB",
            borderRadius: "3px",
            top: "100px",
            left: "68px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "14px",
            height: "14px",
            background: "#F3F4F6",
            border: "1px solid #D1D5DB",
            borderRadius: "3px",
            top: "100px",
            left: "88px",
          }}
        />

        {/* Question mark badge */}
        <div
          style={{
            position: "absolute",
            width: "60px",
            height: "60px",
            background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)",
            borderRadius: "50%",
            bottom: "28px",
            right: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "34px",
            fontWeight: "bold",
            color: "white",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          }}
        >
          ?
        </div>
      </div>
    ),
    {
      width: 192,
      height: 192,
    }
  );
}
