import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

Given('I don\'t have a post it with the message {string} via API', (message) => {
    cy.request('GET', 'localhost:3000/postits').then(response => {
        response.body.forEach(postit => {
            if (postit.content == message) {
                cy.request({
                    method: 'DELETE',
                    url: `localhost:3000/postits/${postit.id}`,
                    body: { "user_id": "2" }
                })
            }
        });
    });
});

Then('the {string} is displayed', (title) => {
    cy.get('.bg-white').find('h3').should('contain', title);
    cy.get('[data-cy="postit-input"]').should('have.attr', 'placeholder', 'Write your note...').and('is.visible');
    cy.get('[data-cy="add-postit-btn"]').should('contain', 'Add Post-it').and('is.visible');
});

When('I create new post it with the message {string}', (message) => {
    cy.get('[data-cy="postit-input"]').clear().type(message);
    cy.get('[data-cy="add-postit-btn"]').click()
});

Then('the post it with the message {string} appears with {string} as the author', (message, author) => {
    verifyPostIt(message, author);
});

Then('I see the post it {string} written by {string}', (message, author) => {
    verifyPostIt(message, author);
});

function verifyPostIt(message, author) {
    cy.get('[data-cy="postit-content"]').contains(message).parent().within(() => {
        cy.get('[data-cy="postit-author"]').should('be.visible').then((authorName) =>
            expect(authorName[0].innerText).to.equal(author)
        );
        cy.get('[data-cy="postit-content"]').should('be.visible');
        let date = new Date();
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear()
        cy.get('[data-cy="postit-date"]').should('contain', `${day}/${month}/${year}`);
    })
};