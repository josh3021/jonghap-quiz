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
          borderRadius: "100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-50px",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />

        {/* Main card */}
        <div
          style={{
            position: "absolute",
            width: "340px",
            height: "270px",
            background: "linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)",
            borderRadius: "32px",
            top: "100px",
            left: "86px",
            boxShadow: "0 12px 60px rgba(0,0,0,0.15)",
          }}
        />

        {/* Content lines */}
        <div
          style={{
            position: "absolute",
            width: "142px",
            height: "18px",
            background: "#E5E7EB",
            borderRadius: "9px",
            top: "148px",
            left: "128px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "198px",
            height: "18px",
            background: "#D1D5DB",
            borderRadius: "9px",
            top: "182px",
            left: "128px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "114px",
            height: "18px",
            background: "#E5E7EB",
            borderRadius: "9px",
            top: "216px",
            left: "128px",
          }}
        />

        {/* Checkbox checked */}
        <div
          style={{
            position: "absolute",
            width: "36px",
            height: "36px",
            background: "#10B981",
            borderRadius: "8px",
            top: "268px",
            left: "128px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            color: "white",
          }}
        >
          ✓
        </div>

        {/* Checkbox unchecked */}
        <div
          style={{
            position: "absolute",
            width: "36px",
            height: "36px",
            background: "#F3F4F6",
            border: "2px solid #D1D5DB",
            borderRadius: "8px",
            top: "268px",
            left: "178px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "36px",
            height: "36px",
            background: "#F3F4F6",
            border: "2px solid #D1D5DB",
            borderRadius: "8px",
            top: "268px",
            left: "228px",
          }}
        />

        {/* Question mark badge */}
        <div
          style={{
            position: "absolute",
            width: "160px",
            height: "160px",
            background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)",
            borderRadius: "50%",
            bottom: "70px",
            right: "62px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "90px",
            fontWeight: "bold",
            color: "white",
            boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
          }}
        >
          ?
        </div>
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  );
}
