import * as credentials from "../fixtures/credentials.json";

describe("E2E: Login & Change password", () => {
  const login = () => {
    cy.get("#username")
      .type(credentials.username)
      .should("have.value", credentials.username);
    cy.get("#password")
      .type(credentials.password)
      .should("have.value", credentials.password);
    cy.get("button").contains("Sign in").click();
  };

  const logout = () => {
    cy.get("button").contains("Logout").click();
    cy.url().should("include", "/posts/");
  };

  const visitLogin = () => {
    cy.get(".nav-item").contains("Login").click();
    cy.url().should("include", "/login");
  };

  const visitProfile = () => {
    cy.url().should("include", "/posts/");
    cy.get(".nav-item").contains(credentials.username).click();
    cy.url().should("include", "/profile");
  };

  const changePassword = (oldPassword: string, newPassword: string) => {
    cy.get("button").contains("Change Password").click();
    cy.get(".pw-change-form-input").eq(0).type(oldPassword);
    cy.get(".pw-change-form-input").eq(1).type(newPassword);
    cy.get(".pw-change-form-input").eq(2).type(newPassword);
    cy.get("button").contains("Save").click();
  };

  it("should test the login process after a password change", () => {
    cy.visit("http://frontend.blogapp.com:8080/login");
    login();
    visitProfile();
    changePassword(credentials.password, credentials.newPassword);
    cy.get(".pw-change-form-input").should("have.length", 0);
    changePassword(credentials.newPassword, credentials.password);
    logout();
    visitLogin();
    login();
    visitProfile();
    logout();
  });
});
