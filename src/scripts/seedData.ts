import dbConnect from '../config/mongodb.js';
import Post from '../models/post.js';

const samplePosts = [
    {
        title: "Welcome to our Social Platform!",
        content:
            "This is a safe space for everyone to share their thoughts and connect with others.",
        author: "Admin",
        mediaUrl: "https://picsum.photos/600/400?random=1",
        mediaType: "image",
        likes: 12,
        comments: [
            {
                author: "User1",
                content: "Great platform! Love the safety features.",
                createdAt: new Date(),
                toxicityCheck: {
                    result: "Safe",
                    sarcasm: "Unknown",
                    checkedAt: new Date(),
                    bypassed: false,
                },
            },
            {
                author: "CoolGuy",
                content: "Awesome UI design 🔥",
                createdAt: new Date(),
                toxicityCheck: {
                    result: "Safe",
                    sarcasm: "None",
                    checkedAt: new Date(),
                    bypassed: false,
                },
            },
        ],
    },
    {
        title: "AI Moderation Demo",
        content: "Here is how our platform detects toxicity using machine learning.",
        author: "SafetyTeam",
        mediaUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
        mediaType: "video",
        likes: 25,
        comments: [],
    },
    {
        title: "Daily Meme Drop",
        content: "Good vibes only 😄",
        author: "MemeMaster",
        mediaUrl: "https://picsum.photos/600/400?random=2",
        mediaType: "image",
        likes: 70,
        comments: [
            {
                author: "FunnyDude",
                content: "LOL that's hilarious!",
                createdAt: new Date(),
                toxicityCheck: {
                    result: "Safe",
                    sarcasm: "None",
                    checkedAt: new Date(),
                    bypassed: false,
                },
            },
        ],
    },
    {
        title: "Respectful Discussion",
        content: "What do you think about online harassment issues today?",
        author: "ThinkTank",
        mediaUrl: null,
        mediaType: null,
        likes: 18,
        comments: [
            {
                author: "UserX",
                content: "People need to chill sometimes.",
                createdAt: new Date(),
                toxicityCheck: {
                    result: "Neutral",
                    sarcasm: "Possible sarcasm detected",
                    checkedAt: new Date(),
                    bypassed: false,
                },
            },
        ],
    },
];

async function seedData() {
    try {
        await dbConnect();
        await Post.deleteMany({});
        await Post.insertMany(samplePosts);
        console.log('Sample data seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seedData();