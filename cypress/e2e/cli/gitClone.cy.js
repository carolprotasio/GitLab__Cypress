import faker from "faker";

//const options = { env: { snapshotOnly: true } };

describe('git clone', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }
  
    beforeEach(() => {
      cy.api_deleteAllProjects()
      cy.api_createProject(project)
    })
  
    it('successfully', () => {
      cy.cloneViaSSH(project)
  
      cy.readFile(`cypress/downloads/${project.name}/README.md`)
        .should('contain', `# ${project.name}`)
        .and('contain', project.description)
    })
  })