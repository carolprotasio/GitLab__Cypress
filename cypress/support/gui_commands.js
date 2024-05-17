/// <reference types="cypress" />


Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {},
  ) => {
    const login = () => {
      cy.visit('/users/sign_in')
  
      cy.get("[data-qa-selector='login_field']").type(user)
      cy.get("[data-qa-selector='password_field']").type(password, { log: false })
      cy.get("[data-qa-selector='sign_in_button']").click()
    }
    const validate = () => {
      cy.visit('/');
      cy.location('pathname', { timeout: 1000 })
        .should('not.eq', '/users/sign_in');
    }
    const options = {
      cacheAcrossSpecs: true, 
      validate,
    }
    if (cacheSession) {
      cy.session(user, login, options)
    } else {
      login();
    }
  })
Cypress.Commands.add('logout', () => {
    cy.get('.qa-user-avatar').click();
    cy.contains('Sign out').click();
})
Cypress.Commands.add('createFirstProject', (projectName, projectDescription) => {
  cy.visit('/projects/new');

  cy.get('#project_name').type(projectName);
  cy.get('#project_description').type(projectDescription);
  cy.get('#project_initialize_with_readme').check();
  cy.get('#new_project > input.btn.btn-success.project-submit').click();
})
Cypress.Commands.add('gui_createNewProject', project => {
  cy.visit('/projects/new');

  cy.get('#project_name').type(project.name);
  cy.get('#project_description').type(project.description);
  cy.get('#project_initialize_with_readme').check();
  cy.get('#blank-project-pane > #new_project > .btn-success').click();
})
Cypress.Commands.add( 'gui_createIssue', issue => {    
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

    cy.get('#issue_title').type(issue.title);
    cy.get('#issue_description').type(issue.description);
    cy.contains('Submit issue').click();

});

Cypress.Commands.add('gui_setLabelOnIssue', label => {
  cy.get('.qa-edit-link-labels').click()
  cy.contains(label.name).click()
  cy.get('body').click()
})

Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
  cy.get('div.block.milestone > div.title.hide-collapsed > a').click();
  cy.contains(milestone.title).click();  
})
    

  