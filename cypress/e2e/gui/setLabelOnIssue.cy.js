import faker from "faker";

const options = { env: { snapshotOnly: true } };

describe('GUI - Create Label on an Issue', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(3)
        }
    }
    const label = {
        name: `label-${faker.random.words()}`,
        color: '#ffaabb'
    }
    beforeEach(() => {
        cy.api_deleteAllProjects();
        cy.login();
        cy.api_createIssue(issue)
          .then((response) => {
            cy.api_createLabel(response.body.project_id, label)
            cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`);

          })
        
    });
    it('Create Label on an Issue Successfully', () => {
        cy.gui_setLabelOnIssue(label);

        cy.get('.qa-labels-block').should('contain', label.name);
        cy.get('.qa-labels-block span')
            .should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`);

        
    });
});