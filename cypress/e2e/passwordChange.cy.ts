describe("E2E: Login & Change password", () => {
  it("should perform a login, navigate to the profile page, change the user password, change it back, logout and login & logout again", () => {
    const credentials = {
      username: "admin",
      password: "8[D+ko71(%Z7-5(7Pfe7+?_2jd",
      newPassword: "[70d:0!B39yXZG577_F7j]Td92dja23",
    };

    cy.visit("http://frontend.blogapp.com:8080/login");
    cy.get("#username")
      .type(credentials.username)
      .should("have.value", credentials.username);
    cy.get("#password")
      .type(credentials.password)
      .should("have.value", credentials.password);
    cy.get("button").contains("Sign in").click();
    cy.url().should("include", "/posts/");
    cy.get(".nav-item").contains(credentials.username).click();
    cy.url().should("include", "/profile");
    cy.get("button").contains("Change Password").click();
    cy.get(".pw-change-form-input").eq(0).type(credentials.password);
    cy.get(".pw-change-form-input").eq(1).type(credentials.newPassword);
    cy.get(".pw-change-form-input").eq(2).type(credentials.newPassword);
    cy.get("button").contains("Save").click();
    cy.get(".pw-change-form-input").should("have.length", 0);
    cy.get("button").contains("Change Password").click();
    cy.get(".pw-change-form-input").eq(0).type(credentials.newPassword);
    cy.get(".pw-change-form-input").eq(1).type(credentials.password);
    cy.get(".pw-change-form-input").eq(2).type(credentials.password);
    cy.get("button").contains("Save").click();
    cy.get("button").contains("Logout").click();
    cy.url().should("include", "/posts/");
    cy.get(".nav-item").contains("Login").click();
    cy.url().should("include", "/login");

    cy.get("#username")
      .type(credentials.username)
      .should("have.value", credentials.username);
    cy.get("#password")
      .type(credentials.password)
      .should("have.value", credentials.password);
    cy.get("button").contains("Sign in").click();
    cy.url().should("include", "/posts/");

    cy.get(".nav-item").contains(credentials.username).click();
    cy.url().should("include", "/profile");
    cy.get("button").contains("Logout").click();
  });
});
