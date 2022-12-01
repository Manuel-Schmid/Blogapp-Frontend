describe("E2E: Navigation", () => {
  it("tests navigation between posts, detail-post and login-page", () => {
    cy.visit("http://frontend.blogapp.com:8080/posts/");
    cy.get(".post").should("have.length", 4).eq(0).click();
    cy.url().should("include", "/posts/");
    cy.contains("Tags");
    cy.contains("Category");
    cy.contains("Comments");
    cy.get(".nav-item").contains("Login").click();
    cy.url().should("include", "/login");
  });
});
