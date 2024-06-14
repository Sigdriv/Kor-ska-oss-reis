import React from "react";

interface EmailProps {
  Token: string;
}

const Email = ({ Token }: EmailProps) => {
  return (
    <html>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#f8f9fa" }}>
        <table
          width="100%"
          border={0}
          cellSpacing="0"
          cellPadding="0"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          <tr>
            <td align="center" style={{ padding: "20px 0" }}>
              <table
                width="600"
                border={0}
                cellSpacing="0"
                cellPadding="0"
                style={{
                  backgroundColor: "#e2e8f0",
                  borderRadius: "8px",
                  padding: "20px",
                }}
              >
                <tr>
                  <td align="center" style={{ padding: "20px 40px" }}>
                    <h1
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#1a202c",
                      }}
                    >
                      Tilbakestill ditt passord
                    </h1>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#4a5568",
                        marginBottom: "20px",
                      }}
                    >
                      Trykk på knappen under eller lim inn denne URL-en i din
                      nettleser:
                    </p>
                    <a
                      href={`https://kor-ska-oss-reis.vercel.app/auth/reset-password/${Token}`}
                      style={{
                        fontSize: "16px",
                        color: "#3182ce",
                        textDecoration: "underline",
                        wordWrap: "break-word",
                      }}
                    >
                      https://kor-ska-oss-reis.vercel.app/auth/reset-password/
                      {Token}
                    </a>
                    <div style={{ marginTop: "20px" }}>
                      <a
                        href={`https://kor-ska-oss-reis.vercel.app/auth/reset-password/${Token}`}
                        style={{
                          display: "inline-block",
                          padding: "10px 20px",
                          fontSize: "16px",
                          color: "#fff",
                          backgroundColor: "#2d3748",
                          borderRadius: "4px",
                          textDecoration: "none",
                        }}
                      >
                        Tilbakestill passord
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};

export default Email;
