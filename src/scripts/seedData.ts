import dbConnect from '../config/mongodb';
import Post from '../models/post';

const samplePosts = [
    {
        title: 'Welcome to our Social Platform!',
        content: 'This is a safe space for everyone to share their thoughts and connect with others.',
        author: 'Admin',
        comments: [
            {
                author: 'User1',
                content: 'Great platform! Love the safety features.',
                createdAt: new Date()
            }
        ]
    },
    {
        title: 'The Importance of Online Safety',
        content: 'With AI-powered toxicity detection, we can create a better online environment for everyone.',
        author: 'SafetyTeam',
        comments: []
    }
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