require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const { createObjectCsvWriter } = require('csv-writer');

// Environment variables
const SUBREDDIT = process.env.SUBREDDIT || 'javascript';
const INTERVAL = process.env.INTERVAL || 600000; // 10 minutes

const csvWriter = createObjectCsvWriter({
    path: `./${SUBREDDIT}_posts.csv`,
    header: [
        { id: 'title', title: 'Post Title' },
        { id: 'author', title: 'Author' },
        { id: 'timestamp', title: 'Timestamp' },
        { id: 'comments', title: 'Comments Count' },
        { id: 'upvotes', title: 'Upvotes' }
    ]
});

async function scrapeSubreddit() {
    try {
        const response = await axios.get(`https://www.reddit.com/r/${SUBREDDIT}/new.json`);
        const posts = response.data.data.children.map(child => child.data);

        const records = posts.map(post => ({
            title: post.title,
            author: post.author,
            timestamp: new Date(post.created_utc * 1000).toISOString(),
            comments: post.num_comments,
            upvotes: post.ups
        }));

        await csvWriter.writeRecords(records);
        console.log('Data scraped and saved to CSV');
    } catch (error) {
        console.error('Error during scraping:', error.message);
    }
}

setInterval(scrapeSubreddit, INTERVAL);
scrapeSubreddit(); 
