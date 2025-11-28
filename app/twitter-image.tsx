import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "종합퀴즈 - 다양한 분야의 퀴즈를 풀어보세요";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorations */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />

        {/* Category cards */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginBottom: "50px",
          }}
        >
          {[
            { icon: "🌍", label: "지리" },
            { icon: "🔬", label: "과학" },
            { icon: "📚", label: "역사" },
            { icon: "🎨", label: "예술" },
            { icon: "🧠", label: "상식" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  fontSize: "64px",
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "24px",
                  padding: "24px 32px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  fontSize: "18px",
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: "500",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Title section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <h1
              style={{
                fontSize: "84px",
                fontWeight: "800",
                color: "white",
                margin: 0,
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                letterSpacing: "-2px",
              }}
            >
              종합퀴즈
            </h1>
            <div
              style={{
                background: "rgba(255,255,255,0.25)",
                borderRadius: "50%",
                width: "70px",
                height: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
                color: "white",
                fontWeight: "bold",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              ?
            </div>
          </div>
          <p
            style={{
              fontSize: "32px",
              color: "rgba(255,255,255,0.95)",
              margin: 0,
              fontWeight: "400",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            다양한 분야의 퀴즈를 풀어보세요
          </p>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            gap: "8px",
          }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                width: i === 2 ? "40px" : "12px",
                height: "6px",
                borderRadius: "3px",
                background: i === 2 ? "white" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
