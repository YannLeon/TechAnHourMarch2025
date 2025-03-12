import { When, Then } from "@badeball/cypress-cucumber-preprocessor"

When('I delete post it with the message {string}', (message) => {
    cy.get('[data-cy="postit-content"]').contains(message).parent().within(() => {
        cy.get('[data-cy="postit-delete"]').click()
    })
    cy.wait(500)
});

Then('the user {string} can only delete their post it', (author) => {
    cy.get('[data-cy="postit"]').then((postIts) => {
        for (let i = 0; i < postIts.length; i++) {
            checkDeleteButton(i, author.toUpperCase());
        }
    });
});

Then('the admin user can delete everyone\'s post it', () => {
    let numberOfPostIts, numberOfDeleteButtons;
    cy.get('[data-cy="postit"]').then((postIts) => {
        numberOfPostIts = postIts.length
    });
    cy.get('[data-cy="postit-delete"]').then(deleteButton => {
        numberOfDeleteButtons = deleteButton.length
        expect(numberOfPostIts).to.eq(numberOfDeleteButtons)
        for (let i = 0; i < numberOfDeleteButtons; i++) {
            cy.get('[data-cy="postit-delete"]').eq(i).should('be.visible');
        }
    })
});

function checkDeleteButton(postItNumber, author) {
    cy.get('[data-cy="postit"]').eq(postItNumber).within(() => {
        cy.get('[data-cy="postit-author"]').then((authorName) => {
            if (authorName[0].innerText == author) {
                cy.get('[data-cy="postit-delete"]').should('be.visible');
            } else {
                cy.get('[data-cy="postit-delete"]').should('not.exist');
            }
        })
    })
};
