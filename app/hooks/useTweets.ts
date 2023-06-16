import { create } from 'zustand';


interface TweetStore {
    tweets: any;
    addTweet: (tweet: any) => void;
}

const useTweetStore = create<TweetStore>((set) => ({
    tweets: [],
    addTweet: (tweet) => set((state) => ({ tweets: [...state.tweets, tweet] })),
}));

export default useTweetStore;
