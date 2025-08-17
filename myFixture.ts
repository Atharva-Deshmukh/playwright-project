import { test as testToBeExtended } from '@playwright/test';
/* Alias original test function, since we will be exporting the extended test function 
   with the same name 
*/

/* Define a data type */
type AD_TYPE = {
    name: string,
    mail: string
};

/* Create your own fixture by extending the original test */
const myTestFixture = testToBeExtended.extend<AD_TYPE>({
    name: 'AD',
    mail: 'ad@example.com'
});

/* Export this created fixture */
export const test = myTestFixture;

