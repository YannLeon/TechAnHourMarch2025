const fs = require("fs");
const path = require("path");

const featureDir = "cypress/e2e";
const videoDir = "cypress/videos";
const outputFile = "user-doc.md";

// Helper function to generate a valid video file path
const getVideoPath = (scenarioName) => {
  const files = fs.readdirSync(videoDir);
  const videoFile = files.find(
    (file) => file.includes(scenarioName) && file.endsWith(".mp4")
  );
  return videoFile ? path.join(videoDir, videoFile) : null;
};

// Start documentation content
let content = "# 📝 User Documentation from Gherkin Scenarios\n\n";
content +=
  "This document includes test scenarios along with their corresponding Cypress-generated videos.\n\n";

// Read all feature files
const files = fs
  .readdirSync(featureDir)
  .filter((file) => file.endsWith(".feature"));

files.forEach((file) => {
  const featurePath = path.join(featureDir, file);
  const featureContent = fs.readFileSync(featurePath, "utf-8");

  content += `## 📌 ${file.replace(".feature", "")}\n\n`;
  content += "```gherkin\n" + featureContent + "\n```\n\n";

  // Extract scenario names from feature file
  const scenarioMatches = featureContent.match(/Scenario:\s(.+)/g);

  if (scenarioMatches) {
    scenarioMatches.forEach((scenario) => {
      const scenarioName = scenario.replace("Scenario: ", "").trim();
      const videoPath = getVideoPath(scenarioName);

      content += `### 🎯 Scenario: ${scenarioName}\n`;
      if (videoPath) {
        content += `📽️ **Test Video:** [Watch here](./${videoPath})\n\n`;
      } else {
        content += `⚠️ No video found for this scenario.\n\n`;
      }
    });
  }
});

// Write to Markdown file
fs.writeFileSync(outputFile, content);
console.log(`✅ User documentation generated: ${outputFile}`);
