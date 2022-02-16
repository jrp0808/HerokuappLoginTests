/// <reference types="cypress" />

//Test 1 - Navigate to login page
describe("Verify Herokuapp Login Page", () => {
	beforeEach(() => {
		cy.clearCookies();
	});

	//Verify Navigation to Login Page
	it("Verify Navigation to Login Page", () => {
		cy.visit("https://the-internet.herokuapp.com/login");
		//Verify Login Page Text
		cy.get("h2").contains("Login Page");
		//Verify Username TextBox
		cy.get("#username").should("exist");
		//Verify Password TextBox
		cy.get("#password").should("exist");
		//Verify Log In Button is visible
		cy.get("button").should("be.visible");
		//Verify URL includes /login
		cy.url().should("include", "/login");
	});

	//Verify Successful Login
	it("Verify Successful Login", () => {
		cy.visit("https://the-internet.herokuapp.com/login");
		cy.get("#username").click();
		cy.get("#username").type("tomsmith");
		cy.get("#password").click();
		cy.get("#password").type("SuperSecretPassword!");
		cy.get("button").click();
		cy.get("#flash").contains("You logged into a secure area!");
	});

	//Verify Unsuccessful Login
	it("Verify Unsuccessful Login", () => {
		cy.visit("https://the-internet.herokuapp.com/login");
		cy.get("#username").click();
		cy.get("#username").type("tomsmiths");
		cy.get("#password").click();
		cy.get("#password").type("SuperSecretPassword!");
		cy.get("button").click();
		cy.get("h2").contains("Login Page");
	});

	//Verify incorrect username message
	it("Verify incorrect username message Message", () => {
		cy.visit("https://the-internet.herokuapp.com/login");
		cy.get("#username").click();
		cy.get("#username").type("tomsmiths");
		cy.get("#password").click();
		cy.get("#password").type("SuperSecretPassword!");
		cy.get("button").click();
		cy.contains("Your username is invalid!").should("exist");
		cy.get("h4").should("exist");
	});

	//Verify incorrect password message
	it("Verify incorrect password Message", () => {
		cy.visit("https://the-internet.herokuapp.com/login");
		cy.get("#username").click();
		cy.get("#username").type("tomsmith");
		cy.get("#password").click();
		cy.get("#password").type("SuperSecretPassword!a");
		cy.get("button").click();
		cy.contains("Your password is invalid!").should("exist");
		cy.get("h4").should("exist");
	});

	//Verify using empty fields
	it("Verify empty fields", () => {
		cy.visit("https://the-internet.herokuapp.com/login");
		cy.get("#username").click();
		cy.get("#username").should("be.empty");
		cy.get("#password").click();
		cy.get("#password").should("be.empty");
		cy.get("button").click();
		cy.get("h4").should("exist");
	});

    //Verify Successful Login URL
    it("Verify Successful Login URL", () => {
        cy.visit("https://the-internet.herokuapp.com/login");
        cy.get("#username").click();
        cy.get("#username").type("tomsmith");
        cy.get("#password").click();
        cy.get("#password").type("SuperSecretPassword!");
        cy.get("button").click();
        cy.get('#flash').contains('You logged into a secure area!');
        cy.get('h4').should('exist');
        cy.get('h4').contains('Welcome to the Secure Area. When you are done click logout below.');
        cy.location('href', {timeout: 10000}).should('contain', 'https://the-internet.herokuapp.com/secure');
    });

    //Verify Unsuccessful Login URL
    it("Verify Unsuccessful Login URL", () => {
        cy.visit("https://the-internet.herokuapp.com/login");
        cy.get("#username").click();
        cy.get("#username").type("tomsmi4th");
        cy.get("#password").click();
        cy.get("#password").type("SuperSecretPassword!");
        cy.get("button").click();
        cy.contains("Your username is invalid!").should("exist");
        cy.url().should("include", "/login");
    });
});

