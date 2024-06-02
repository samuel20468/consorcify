import { IReviewCardProps } from "@/Interfaces/Interfaces";


const ReviewCard = ({ review }: IReviewCardProps) => {
    return (
      <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 w-[30rem]">
        <div className="flex items-start space-x-4">
          <img
            className="w-12 h-12 rounded-full"
            src={review.profilePic}
            alt="Profile"
          />
          <div className="flex-1">
            <p className="text-gray-700 font-semibold mb-3">{review.text}</p>
            <p className="text-gray-500">{review.author}</p>
          </div>
          <div className="text-gray-400 text-sm">{review.date}</div>
        </div>
        <div className="flex items-center mt-4">
          <div className="flex space-x-1 text-yellow-400 justify-end w-full">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${
                  index >= review.rating ? "text-gray-300" : ""
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
      </div>
    );
  };
  
  export default ReviewCard;

