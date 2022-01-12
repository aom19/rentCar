describe("book", () => {
  it("user can book", () => {
    //login
    cy.visit("http://localhost:3000/");
    cy.visit("http://localhost:3000/auth");
    cy.findByPlaceholderText(/email/i).type("ostapovici.anton@gmail.com");
    cy.findByPlaceholderText(/password/i).type("123456789");
    cy.findByRole("button", { name: /submit/i }).click();

    //go to cars
    //click on car

    cy.get(
      ":nth-child(1) > .car-wrap > .text > .d-block > .btn-secondary"
    ).click();
    let model;
    cy.get(".subheading").then(($span) => {
      model = $span.text();
    });

    //book now
    cy.findByRole("tab", { name: /book car/i }).click();

    //complete the form
    cy.get(".request-form > :nth-child(2) > .form-control").type("Chisinau");
    cy.get(":nth-child(3) > .form-control").type("Ungheni");
    cy.get("#book_pick_date").click();
    cy.get("#book_pick_date").type("01/01/2022");
    cy.get("#book_off_date").type("01/20/2022");
    //click the button

    cy.get(".btn").click();

    //check if car booked is the same
    cy.get(".btn-primary").click();

    let model1;
    cy.get(".subheading")
      .then(($span) => {
        model1 = $span.text();
      })
      .then(() => {
        expect(model).to.equal(model1);
      });
  });
});
