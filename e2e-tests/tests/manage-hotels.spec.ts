import {test ,expect} from "@playwright/test";
const UI_URL = "http://localhost:5173"; 
import path from "path";



test.beforeEach(async ({page}) =>{
    await page.goto(UI_URL);

  //get the signin button
  await page.getByRole("link",{name:"Sign In"}).click();
  await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password");

  await page.getByRole("button",{name:"Sign In"}).click();

  await expect(page.getByText("Sign in successful")).toBeVisible();
});


test("should allow user to add a hotel" , async ({page})=>{
    await page.goto(`${UI_URL}/add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("This is description for the test hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]',"3");

    await page.getByText("Budget").click();

    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("2");

    await page.setInputFiles('[name="imageFiles"]',[
        path.join(__dirname, "files" ,"hotel-1.jpeg"),
        path.join(__dirname , "files" ,"hotel-2.jpeg"),
    ]);

    await page.getByRole("button", {name: "Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();

});

test("should display hotel",async ({page})=>{
    await page.goto(`${UI_URL}/my-hotels`);

    await expect(page.getByText("Dublin Getaways")).toBeVisible();
    await expect(page.getByText("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")).toBeVisible();

    await expect(page.getByText("Dublin, Ireland")).toBeVisible();
    await expect(page.getByText("All Inclusive")).toBeVisible();
    await expect(page.getByText("$119 per night")).toBeVisible();
    await expect(page.getByText("2 adults, 3 child")).toBeVisible();
    await expect(page.getByText("2 star rating")).toBeVisible();

    await expect(page.getByRole("link",{ name:"View Details"}).first()).toBeVisible();
    await expect(page.getByRole("link",{ name:"Add Hotel"})).toBeVisible();
});

test("should edit hotel",async ({page})=>{
    await page.goto(`${UI_URL}/my-hotels`);

    await page.getByRole("link",{name:"View Details"}).first().click();

    await page.waitForSelector('[name="name"]',{state:"attached"});
    await expect(page.locator('[name="name"]')).toHaveValue("Dublin Getaways");
    await page.locator('[name="name"]').fill("Dublin Getaways Hotel Updated");
    await page.getByRole("button",{name:"Save"}).click();

    await expect(page.getByText("Hotel Saved!")).toBeVisible();

    await page.reload();

    await expect(page.locator('[name="name"]')).toHaveValue("Dublin Getaways Hotel Updated");
    await page.locator('[name="name"]').fill("Dublin Getaways");
    await page.getByRole("button",{name:"Save"}).click();
})