import React from "react";
import { ContactUsType } from "@/types/types";

const ContactUsEmail = ({
  name,
  email,
  phone,
  subject,
  message,
}: ContactUsType) => {
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
                        marginBottom: "20px",
                      }}
                    >
                      Kontakt oss melding fra {name}
                    </h1>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#4a5568",
                        marginBottom: "20px",
                        textAlign: "left",
                      }}
                    >
                      <strong>Navn:</strong> {name}
                      <br style={{ marginBottom: "10px" }} />
                      <strong>E-post:</strong> {email}
                      <br style={{ marginBottom: "10px" }} />
                      <strong>Telefon:</strong> {phone}
                      <br style={{ marginBottom: "10px" }} />
                      <strong>Emne:</strong> {subject}
                      <br style={{ marginBottom: "10px" }} />
                      <strong>Melding:</strong>{" "}
                      <br style={{ marginBottom: "10px" }} />
                      {message}
                    </p>
                    <div style={{ marginTop: "20px" }}>
                      <a
                        href={`mailto:${email}`}
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
                        Svar på e-post
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

export default ContactUsEmail;
