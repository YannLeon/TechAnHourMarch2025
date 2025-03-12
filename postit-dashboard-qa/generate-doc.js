const fs = require("fs");
const path = require("path");

const featureDir = "cypress/e2e/features";
const videoDir = "cypress/videos";
const outputFile = "user-doc.md";

// Find videos for a scenario
const getVideoPath = (featureName, scenarioName) => {
  const formattedScenario = scenarioName.replace(/\s+/g, "_");
  const videoFile = `${videoDir}/${featureName}_${formattedScenario}.mp4`;

  return fs.existsSync(videoFile) ? videoFile : null;
};

let content = "# 📝 User Documentation from Gherkin Scenarios\n\n";

const files = fs
  .readdirSync(featureDir)
  .filter((file) => file.endsWith(".feature"));

files.forEach((file) => {
  const featureName = file.replace(".feature", "");
  const featureContent = fs.readFileSync(path.join(featureDir, file), "utf-8");

  content += `## 📌 ${featureName}\n\n\`\`\`gherkin\n${featureContent}\n\`\`\`\n\n`;

  const scenarioMatches = featureContent.match(/Scenario:\s(.+)/g);
  if (scenarioMatches) {
    scenarioMatches.forEach((scenario) => {
      const scenarioName = scenario.replace("Scenario: ", "").trim();
      const videoPath = getVideoPath(featureName, scenarioName);

      content += `### 🎯 Scenario: ${scenarioName}\n`;
      if (videoPath) {
        content += `📽️ **Test Video:** [Watch here](./${videoPath})\n\n`;
      } else {
        content += `⚠️ No video found for this scenario.\n\n`;
      }
    });
  }
});

fs.writeFileSync(outputFile, content);
console.log(`✅ User documentation generated: ${outputFile}`);
