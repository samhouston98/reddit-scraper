### MVP: Reddit Scraper and CSV Exporter

### Overview
This application will scrape a specified subreddit for new posts and save selected data to a CSV file.

### Technical Requirements
Node.js environment
Libraries:
axios for making HTTP requests.
cheerio for parsing HTML.
csv-writer for creating and updating CSV files.
dotenv for managing environment variables (like Reddit API credentials).
Functional Requirements
Data Retrieval:

The application should use Axios to make requests to the Reddit API.
It should accept a subreddit name as a parameter.
Scrape data at regular intervals (e.g., every 10 minutes).
Parse Data:

Extract relevant data such as post title, author, timestamp, number of comments, and upvotes.
Format and save this data in a CSV file.
The CSV file should be named after the subreddit and the date it was created.
CSV File Structure:

Headers: Post Title, Author, Timestamp, Comments Count, Upvotes
Example Row: "How to learn JavaScript","user123","2023-11-22T10:00:00",15,100
Error Handling:

Manage errors related to network issues, API limits, and data parsing.
Documentation:

A README file explaining how to set up and run the application.

### Extensions to the MVP

### Data Analysis:

Analyze the frequency of certain keywords or topics over time.
Provide summary statistics like average upvotes per post.


### Configurable Parameters:

Allow users to set the scraping interval, number of posts to scrape, and other parameters through a configuration file or command-line arguments.
