import faker from "faker";

describe('Create Issues - API Functionality ', () => {
    beforeEach(() => { cy.api_deleteAllProjects()});
    const issue = {
        title: `Issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project: {
            name: `Project-${faker.datatype.uuid()}`,
            description: faker.random.words(6)
        }
    }
    it('Create Issues successfully', () => {
        cy.api_createIssue(issue)
          .then(response => {
            expect(response.status).to.equal(201);
            expect(response.body.title).to.equal(issue.title),
            expect(response.body.description).to.equal(issue.description)
          })
    });
});

