const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/generate-pdf", async (req, res) => {
	const { htmlContent } = req.body;

	if (!htmlContent) {
		return res.status(400).send("Missing HTML content");
	}

	try {
		const browser = await puppeteer.launch({
			headless: "new",
			args: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--disable-web-security",
			],
		});
          
		const page = await browser.newPage();

		await page.setContent(htmlContent);
		await page.waitForTimeout(1000); // Wait for Tailwind to load

		const pdfBuffer = await page.pdf({
			format: "A4",
			printBackground: true,
			margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
		});
          

		await browser.close();

		res.set({
			"Content-Type": "application/pdf",
			"Content-Disposition": "attachment; filename=invoice.pdf",
		});

		res.send(pdfBuffer);
	} catch (err) {
		console.error("Error generating PDF:", err);
		res.status(500).send("Failed to generate PDF");
	}
});

app.listen(PORT);
