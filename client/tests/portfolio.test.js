import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });


test('User Work Flow', async ({ page }) => {

    //Login

    await page.goto('http://localhost:5173/');                                 
    await expect(page).toHaveURL('http://localhost:5173/');                           //Vavigate to homepage
    await expect(page.getByRole('link', { name: 'login' })).toBeVisible();            //Check login is visible
    await page.getByRole('link', { name: 'login' }).click();                          //Navigate to login page
    await expect(page).toHaveURL(/\/login\/?$/);                                      //Regex to check if the URL is correct

    await page.getByLabel('Email').fill(process.env.TEST_EMAIL);                      //Fill in email field  
    await page.getByLabel('Password').fill(process.env.TEST_PASSWORD);                //Fill in password field 
    

    const [response] = await Promise.all([                                            //Create reponse request and login with the test credentials
        page.waitForResponse(response =>
            response.url().includes('/api/users/login') && response.request().method() === 'POST'
        ),
        page.getByRole('button', { name: 'login' }).click()
    ]);

    expect(response.status()).toBe(200);
    await expect(page.getByText('Login successful')).toBeVisible();                   //Check if the response is ok
        
    
    //Check Project Page
    
    await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();         //Check Projects is visible
    await page.getByRole('link', { name: 'Projects' }).click();                       //Click the projects tab            
    await expect(page).toHaveURL(/\/projects\/?$/);                                   //Check the URL 
    await expect(
        page.getByRole('heading', { name: 'Projects' })                               //Checking project page displays heading
    ).toBeVisible();

    await expect(
        page.getByText('GLIP Hackathon', { exact: true })
    ).toBeVisible();

    //Contact Page

    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/\/contact\/?$/);
    await page.getByLabel('First Name').fill('Test');
    await page.getByLabel('Last Name').fill('User');
    await page.getByLabel('Email').fill('test.user@example.com');
    await page.getByLabel('Phone Number').fill('5555555555');
    await page.getByLabel('Message').fill('This is a test message.');

    const [contact_response] = await Promise.all([                                            
            page.waitForResponse(response =>
                response.url().includes('/api/contact') && response.request().method() === 'POST'
            ),
            page.getByRole('button', { name: 'Send Message' }).click()
        ]);

        await expect(page.getByText('Your message has been sent successfully')).toBeVisible();
    expect(contact_response.status()).toBe(201);

});

