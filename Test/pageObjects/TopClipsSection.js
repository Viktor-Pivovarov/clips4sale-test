const { browser, $, $$ } = require('@wdio/globals');

class TopClipsSection {
    // Selectors
    get seeMoreButton() { return $('//*[@id="topClipsSection"]/div[3]/button'); }
    get topClipsSection() { return $$('//*[@id="topClipsSection"]/div[2]/div/div'); }
    get ageCheckbox() { return $('.checkbox'); }
    get enterButton() { return $('//*[@id="enter-agree"]'); }
    get topClipTitles() { return $$('//a[starts-with(@data-testid, "TopClips_") and contains(@data-testid, "-clipCard-titleAnchor")]'); }

    
    // Accepts the age popup.
    async acceptAgePopup() {
        try {
            await this.ageCheckbox.waitForDisplayed({ timeout: 10000 });
            if (this.ageCheckbox.isDisplayed()) {
                await this.ageCheckbox.click();
            }

            await this.enterButton.waitForDisplayed({ timeout: 10000 });
            if (this.enterButton.isDisplayed()) {
                await this.enterButton.click();
            }
        } catch (error) {
            console.error(`Error accepting age popup: ${error.message}`);
            throw error;
        }
    }

    /**
     * Retrieves the titles of the clips in Top Clips Section.
     * @returns {Array}
     */
    async getClipTitles() {
        try {
            const titles = [];
            const clipElements = await this.topClipTitles;
            for (let element of clipElements) {
                if (element && typeof element.getText === 'function') {
                    titles.push(await element.getText());
                }
            }
            return titles;
        } catch (error) {
            console.error(`Error getting clip titles: ${error.message}`);
            throw error;
        }
    }

    /**
     * Retrieves the indexes of the clips in Top Clips Section.
     * @returns {Array}
     */
    async getClipIndexes() {
        try {
            const clipElements = await this.topClipTitles;
            const indexes = await Promise.all(clipElements.map(async element => {
                const testId = await element.getAttribute('data-testid');
                return parseInt(testId.split('_')[1].split('-')[0], 10); // Extract the index from the testId
            }));
            return indexes;
        } catch (error) {
            console.error(`Error getting clip indexes: ${error.message}`);
            throw error;
        }
    }

    /**
     * Clicks the "See More" button and waits for more clips to load.
     */
    async clickSeeMoreAndWaitForClips() {
        try {
            const initialClipsCount = await this.getClipsCount();
            await this.seeMoreButton.waitForDisplayed();
            if (this.seeMoreButton.isExisting() && this.seeMoreButton.isClickable()) {
                await this.seeMoreButton.click();
            }
    
            // A delay to allow the DOM to update
            await browser.pause(5000);
    
            // Wait for the number of clips to increase
            browser.waitUntil(async () => {
                const newClipsCount = await this.getClipsCount();
                return newClipsCount > initialClipsCount;  // Check if the clips count has increased
            }, {
                timeout: 10000,
                timeoutMsg: 'Expected clips count to increase after 10 seconds'
            });
        } catch (error) {
            console.error(`Error clicking 'See More' button: ${error.message}`);
            throw error;
        }
    }
    

    /**
     * Retrieves the count of clips in Top Clips Section.
     * @returns {Number} The count of clips.
     */
    async getClipsCount() {
        try {
            await this.topClipsSection[0].waitForDisplayed();
            return this.topClipsSection.length;
        } catch (error) {
            console.error(`Error getting clips count: ${error.message}`);
            throw error;
        }
    }
}

module.exports = TopClipsSection;
