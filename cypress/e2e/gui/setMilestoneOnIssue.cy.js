import faker from "faker";

const options = { env: { snapshotOnly: true } };

describe('Create Milestone - Gui Functionality', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.word(5),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.word(3)
        },
    
    }
    const milestone = {
        title: `milestone-${faker.datatype.uuid()}`,
        description: `${faker.random.words()}`
    }
    beforeEach(() => {
        cy.api_deleteAllProjects();
        cy.login();
        cy.api_createIssue(issue)
          .then((response) => {
            cy.api_createMilestone(response.body.project_id, milestone)
            cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`);
          });
    })
    
    it('Successfully', () => {
        cy.gui_setMilestoneOnIssue(milestone)
        
        cy.get('.block.milestone').should('contain', milestone.title);

        
    });
});
