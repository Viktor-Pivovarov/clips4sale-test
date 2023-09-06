const { expect } = require('@wdio/globals');
const MainPage = require('../pageObjects/MainPage');

describe('Main Page - Top Clips Count', () => {
    before(async () => {
        await MainPage.open();
        await MainPage.topClips.acceptAgePopup();
    });

    // Test to ensure that 50 clips are displayed after clicking the "See More" button multiple times
    it('should display 50 clips after multiple "See More" clicks', async () => {
        let previousClipsCount = await MainPage.topClips.getClipsCount();

        while (await MainPage.topClips.seeMoreButton.isExisting()) {
            await MainPage.topClips.clickSeeMoreAndWaitForClips();

            const currentClipsCount = await MainPage.topClips.getClipsCount();
            expect(currentClipsCount).toEqual(previousClipsCount + 10, `Expected clips count to increase by 10, but got ${currentClipsCount - previousClipsCount}`);
            previousClipsCount = currentClipsCount;
        }

        expect(previousClipsCount).toEqual(50, `Expected final clips count to be 50, but got ${previousClipsCount}`);
        
        // Ensure the "See More" button is no longer present after all clips are displayed
        expect(await MainPage.topClips.seeMoreButton.isExisting()).toBe(false, '"See More" button should not exist after all clicks');
    });
});
