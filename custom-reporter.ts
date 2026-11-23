
import type {
  Reporter,
  FullConfig,
  FullResult,
  TestCase,
  TestResult
} from '@playwright/test/reporter';

import * as fs from 'node:fs';

class CustomReporter implements Reporter {

  private results: Array<{
    title: string;
    status: string;
    duration: number;
  }> = [];

  private totalTests = 0;

  onBegin(config: FullConfig, suite: import('@playwright/test/reporter').Suite) {
    this.totalTests = suite.allTests().length;
    console.log(`Starting ${this.totalTests} tests`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    this.results.push({
      title: test.title,
      status: result.status,
      duration: result.duration
    });
  }

  onEnd(result: FullResult) {

    const passed = this.results.filter(t => t.status === 'passed').length;
    const failed = this.results.filter(t => t.status === 'failed').length;
    const skipped = this.results.filter(t => t.status === 'skipped').length;

    const rows = this.results.map(test => `
      <tr>
        <td>${this.escapeHtml(test.title)}</td>
        <td class="${test.status}">${test.status.toUpperCase()}</td>
        <td>${(test.duration / 1000).toFixed(2)} sec</td>
      </tr>
    `).join('');

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>QA Automation Dashboard</title>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  padding: 40px 20px;
  color: #ffffff;
  background: linear-gradient(135deg, #171923, #30364b, #171923);
}

.container {
  max-width: 1100px;
  margin: auto;
}

header {
  margin-bottom: 35px;
}

h1 {
  color: #F48031;
  font-size: 32px;
  margin-bottom: 10px;
}

.subtitle {
  color: #cbd5e1;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 20px;
  margin-bottom: 35px;
}

.card {
  padding: 25px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  background: rgba(255,255,255,0.10);
  backdrop-filter: blur(14px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
}

.card h3 {
  color: #cbd5e1;
  font-size: 15px;
  margin-bottom: 15px;
}

.card p {
  font-size: 32px;
  font-weight: bold;
}

.accent {
  color: #F48031;
}

.passed {
  color: #22c55e;
}

.failed {
  color: #ef4444;
}

.skipped {
  color: #facc15;
}

.report {
  padding: 25px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.10);
  backdrop-filter: blur(14px);
  overflow-x: auto;
}

h2 {
  color: #F48031;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th, td {
  padding: 15px;
  border-bottom: 1px solid rgba(255,255,255,0.15);
}

th {
  color: #F48031;
}

footer {
  margin-top: 30px;
  color: #cbd5e1;
  text-align: center;
  font-size: 13px;
}

</style>
</head>

<body>
<div class="container">

<header>
  <h1>QA Automation Dashboard</h1>
  <p class="subtitle">ParaBank | Playwright + TypeScript Test Execution Report</p>
</header>

<section class="cards">
  <div class="card">
    <h3>Total Tests</h3>
    <p class="accent">${this.totalTests}</p>
  </div>

  <div class="card">
    <h3>Passed Tests</h3>
    <p class="passed">${passed}</p>
  </div>

  <div class="card">
    <h3>Failed Tests</h3>
    <p class="failed">${failed}</p>
  </div>

  <div class="card">
    <h3>Skipped Tests</h3>
    <p class="skipped">${skipped}</p>
  </div>
</section>

<section class="report">
  <h2>Execution Details</h2>

  <table>
    <thead>
      <tr>
        <th>Test Scenario</th>
        <th>Status</th>
        <th>Duration</th>
      </tr>
    </thead>

    <tbody>
      ${rows || '<tr><td colspan="3">No tests executed</td></tr>'}
    </tbody>
  </table>
</section>

<footer>
  ParaBank QA Automation | Generated using Playwright Custom Reporter
  <br>
  Overall result: ${result.status.toUpperCase()}
</footer>

</div>
</body>
</html>
`;

    fs.mkdirSync('reports', { recursive: true });

    fs.writeFileSync(
      'reports/custom-report.html',
      html,
      'utf-8'
    );

    console.log('Custom HTML report generated successfully');
  }

  private escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, character => {
      const entities: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };

      return entities[character];
    });
  }
}

export default CustomReporter;
