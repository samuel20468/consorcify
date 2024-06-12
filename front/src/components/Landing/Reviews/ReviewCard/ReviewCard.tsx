export interface IReviews {
    profilePic: string;
    text: string;
    author: string;
    type: string;
    rating: number;
}

export interface IReviewCardProps {
    review: IReviews;
}

const ReviewCard = ({ review }: IReviewCardProps) => {
    return (
        <>
            <div className="w-full max-w-md p-6 grid gap-6 font-sans bg-white rounded-[20px]">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16">
                        <img
                            src={review.profilePic}
                            alt="Customer"
                            className="rounded-full"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-black">
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={index}
                                className={`w-5 h-5 ${
                                    index >= review.rating
                                        ? "text-gray-300"
                                        : ""
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9.049 2.927a1 1 0 011.902 0l1.254 3.94a1 1 0 00.95.69h4.178a1 1 0 01.593 1.806l-3.391 2.481a1 1 0 00-.364 1.118l1.253 3.941a1 1 0 01-1.538 1.118l-3.39-2.48a1 1 0 00-1.176 0l-3.39 2.48a1 1 0 01-1.538-1.118l1.253-3.94a1 1 0 00-.364-1.118L2.474 9.362a1 1 0 01.593-1.806h4.178a1 1 0 00.95-.69l1.254-3.94z" />
                            </svg>
                        ))}
                    </div>
                </div>
                <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                    {review.text}
                </p>
                <div className="text-sm">
                    <p className="font-semibold text-black">{review.author}</p>
                    <p className="text-gray-500 dark:text-gray-400">
                        {review.type}
                    </p>
                </div>
            </div>
        </>
    );
};

export default ReviewCard;
