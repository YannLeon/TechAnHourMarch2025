import { Given } from "@badeball/cypress-cucumber-preprocessor"

Given('I have a post it with the message {string} via API', (message) => {
    cy.request('GET', 'localhost:3000/postits').then(response => {
        let postItExist = false
        response.body.forEach(postit => {
            if (postit.content == message) {
                postItExist = true
            }
        });
        if (!postItExist) {
        cy.request({
            method: 'POST',
            url: 'localhost:3000/postits',
            body: { "content": message, "user_id": "1" }
        })
    }
    });
    
});

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