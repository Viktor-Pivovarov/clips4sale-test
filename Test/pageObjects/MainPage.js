const { browser, $, $$ } = require('@wdio/globals');
const TopClipsSection = require('./TopClipsSection.js');
const axios = require('axios');

class MainPage {
    constructor() {
        this.topClips = new TopClipsSection();
    }

    async open() {
        try {
            // Check the status code
            const response = await axios.get('https://clips4sale.com');
            if (response.status !== 200) {
                console.error(`Error: Received status code ${response.status}`);
                throw new Error(`Received status code ${response.status}`);
            }

            await browser.url('https://clips4sale.com');

            // Wait for the page to load completely
            browser.waitUntil(() => {
                return browser.execute(() => {
                    return document.readyState === 'complete';
                });
            }, {
                timeout: 10000,
                timeoutMsg: 'Page did not load in 10 seconds'
            });
        } catch (error) {
            console.error(`Error while waiting for the page to load: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new MainPage();
