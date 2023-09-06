const { expect } = require('@wdio/globals');
const MainPage = require('../pageObjects/MainPage');
const { browser, $ } = require('@wdio/globals'); 


describe('Main Page - Open First Top Clip', () => {
    before(async () => {
        await MainPage.open();
        await MainPage.topClips.acceptAgePopup();
    });

    // Test case to ensure the correct first clip from the "top clips" section opens
    it('should open the correct first clip from the top clips section', async () => {
        // Fetch the titles of the clips in the 'top clips' section
        const topClipTitles = await MainPage.topClips.getClipTitles();
        // Store the title of the first clip for comparison later
        const expectedClipTitle = topClipTitles[0];

        // Click on the first top clip
        const firstClip = MainPage.topClips.topClipTitles[0];
        await firstClip.click();

        // Wait for the clip's page to fully load
        browser.waitUntil(() => {
            return browser.execute(() => {
                return document.readyState === 'complete';
            });
        }, {
            timeout: 10000,
            timeoutMsg: 'Clip page did not load in 10 seconds'
        });

        // Fetch the title of the opened clip
        const openedClipTitle = await $('//*[@id="content"]/div[3]/div[1]/figure/figcaption/div/p').getText();

        // Compare the title of the opened clip with the expected title to ensure the correct clip opened
        expect(openedClipTitle).toEqual(expectedClipTitle, `Expected clip title to be "${expectedClipTitle}", but got "${openedClipTitle}"`);
    });
});
