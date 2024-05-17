import faker from "faker";

const options = { env: { snapshotOnly: true } }

describe('Create Issues', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }
    beforeEach(() => {
        cy.api_deleteAllProjects();
        cy.login();
        cy.api_createProject(issue.project);
        
    });
    it('Create Issue successfully', () => {
        cy.gui_createIssue(issue);
        
        cy.get('.issue-details')
            .should('contain', issue.title)
            .and('contain', issue.description)
        
        
    });
});


