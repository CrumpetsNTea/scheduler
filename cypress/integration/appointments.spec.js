describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")

    cy.visit("/");

    cy.contains("Monday");
  });

it("should book an interview", () => {
  cy.get("[alt=Add]").first().click();

  cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
  cy.get("[alt='Sylvia Palmer']").click();

  cy.contains("Save").click();

  cy.contains(".appointment__card--show", "Lydia Miller-Jones", "Sylvia Palmer");
  
  //The code below (as suggested in Compass) actually selects the first appointment's Sylvia Palmer, rather than checking if the new appointment 
  //has the correct interviewers name in it
  // cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should edit an interview", () => {
    cy.get("[alt=Edit]").first().click({force:true})
  })
});