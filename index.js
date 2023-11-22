require('dotenv').config();
const axios = require('axios');
const { createObjectCsvWriter } = require('csv-writer');

// Environment variables
const SUBREDDIT = 'music'; // Subreddit to scrape
const INTERVAL = parseInt(process.env.INTERVAL) || 600000; // Interval for scraping (default: 10 minutes)
const POST_LIMIT = parseInt(process.env.POST_LIMIT) || 25; // Number of posts to fetch (default: 25)

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
        const response = await axios.get(`https://www.reddit.com/r/${SUBREDDIT}/new.json?limit=${POST_LIMIT}`);
        const posts = response.data.data.children.map(child => child.data);

        const records = posts.map(post => ({
            title: post.title,
            author: post.author,
            timestamp: new Date(post.created_utc * 1000).toISOString(),
            comments: post.num_comments,
            upvotes: post.ups
        }));

        // Basic Data Analysis
        const totalUpvotes = records.reduce((sum, record) => sum + record.upvotes, 0);
        const totalComments = records.reduce((sum, record) => sum + record.comments, 0);
        const averageUpvotes = (records.length > 0) ? (totalUpvotes / records.length).toFixed(2) : 0;
        const averageComments = (records.length > 0) ? (totalComments / records.length).toFixed(2) : 0;

        console.log(`Average Upvotes: ${averageUpvotes}, Average Comments: ${averageComments}`);

        await csvWriter.writeRecords(records);
        console.log('Data scraped and saved to CSV');
    } catch (error) {
        console.error('Error during scraping:', error.message);
    }
}

setInterval(scrapeSubreddit, INTERVAL);
scrapeSubreddit(); // Initial run
