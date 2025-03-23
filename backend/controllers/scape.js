import puppeteer from "puppeteer";

(async () => {
  // Launch browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to Devpost Hackathons Page
  await page.goto("https://devpost.com/api/hackathons", {
    waitUntil: "networkidle2",
  });

  // Scrape data
  const hackathons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".challenge-listing")).map(
      (hack) => ({
        title: hack.querySelector("h2.title")?.innerText.trim(),
        link: "https://devpost.com" + hack.querySelector("a")?.getAttribute("href"),
        date: hack.querySelector(".date")?.innerText.trim() || "N/A",
      })
    );
  });

  console.log(hackathons);
  await browser.close();
})();
