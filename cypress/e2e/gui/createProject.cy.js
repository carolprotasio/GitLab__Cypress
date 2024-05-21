import  faker  from 'faker';

const options = { env: { snapshotOnly: true } }
describe('Create a Project', options, () => {
    beforeEach(() => {
        cy.api_deleteAllProjects()
        cy.login();
        
    });
     
    it('Create a new project successfully', () => {
        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
        cy.gui_createNewProject(project);
        
        cy.url().should('eq', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`);
        cy.contains(project.name).should('be.visible');
        cy.contains(project.description).should('be.visible');
        
    });
});


