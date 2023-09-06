const { expect } = require('@wdio/globals');
const MainPage = require('../pageObjects/MainPage');


describe('Main Page - Top Clips Right Order and no Duplicates', () => {
    before(async () => {
        await MainPage.open();
        await MainPage.topClips.acceptAgePopup();
    });

    // Test case to ensure clips are displayed in the correct ascending order based on their indexes
    it('should display 50 clips in top clips section in ascending order', async () => {
        // Keep expanding clips until the "See More" button disappears
        while (await MainPage.topClips.seeMoreButton.isExisting()) {
            await MainPage.topClips.clickSeeMoreAndWaitForClips();
        }

        // Fetch the indexes of the displayed clips
        const clipIndexes = await MainPage.topClips.getClipIndexes();

        // Check if the fetched indexes are in ascending order
        const sortedClipIndexes = [...clipIndexes].sort((a, b) => a - b);
        expect(clipIndexes).toEqual(sortedClipIndexes, 'Clips are not in ascending order');
    });

    // Test case to ensure there are no duplicate clips
    it('should not have duplicate clips in top clips section', async () => {
        // Fetch the titles of the displayed clips
        const clipTitles = await MainPage.topClips.getClipTitles();

        // Check for uniqueness of the clip titles
        const uniqueClipTitles = new Set(clipTitles);
        expect(uniqueClipTitles.size).toEqual(clipTitles.length, 'There are duplicated clips');
    });
});
