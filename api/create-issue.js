// Vercel Serverless Function für GitHub Issues
export default async function handler(req, res) {
  // CORS Headers für lokale Entwicklung
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required' });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const owner = 'koljaschumann'; // Dein GitHub Username
    const repo = 'genogramm-vite'; // Dein Repository Name

    if (!githubToken) {
      return res.status(500).json({ error: 'GitHub token not configured' });
    }

    // GitHub API Call - Issue erstellen
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body,
          labels: ['bug', 'user-reported'], // Automatische Labels
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub API Error:', errorData);
      return res.status(response.status).json({ 
        error: 'Failed to create issue',
        details: errorData 
      });
    }

    const issue = await response.json();

    return res.status(200).json({
      success: true,
      issueNumber: issue.number,
      issueUrl: issue.html_url,
    });

  } catch (error) {
    console.error('Error creating issue:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
