import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:8080',
		specPattern: 'cypress/e2e/constructor.cy.ts',
		supportFile: 'cypress/support/e2e.ts',
		video: false,
	},
});
