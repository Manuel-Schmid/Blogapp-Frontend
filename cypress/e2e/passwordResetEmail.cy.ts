import * as credentials from "../fixtures/credentials.json";

describe("E2E: Password Reset", () => {
  it("should request a password reset", () => {
    cy.visit("http://frontend.blogapp.com:8080/login");
    cy.get("a").contains("Forgot password").click();
    cy.url().should("include", "/reset-email");
    cy.get("#email")
      .type(credentials.email)
      .should("have.value", credentials.email);
    cy.get("button").contains("Send Reset E-Mail").click();
    cy.contains("E-Mail sent successfully");
  });

  it("should check if a new email has arrived", () => {
    cy.visit("http://smtp.blogapp.com:8081/");
    cy.contains("Reset your blogapp.com password").eq(0).click();
    cy.url().should("include", "/email/");
  });
});
