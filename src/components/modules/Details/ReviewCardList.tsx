import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const reviews = [
  {
    id: 1,
    name: "Abdul Khaled",
    date: "30 Dec, 2024",
    title: "Cozy City Apartment",
    content:
      "This rental apartment is clean, well-located, and thoughtfully furnished. The quiet neighborhood and modern amenities made it a comfortable and convenient place to stay during my time in the city.",
    rating: 5,
    profileImg: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 2,
    name: "Fatema Noor",
    date: "22 Nov, 2024",
    title: "Family-Friendly House",
    content:
      "The house was spacious, tidy, and perfect for our family. It had a fully equipped kitchen, reliable Wi-Fi, and was located close to parks and grocery stores—ideal for a long-term rental stay.",
    rating: 4,
    profileImg: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "Rahim Uddin",
    date: "15 Oct, 2024",
    title: "Quiet Suburban Home",
    content:
      "A peaceful and comfortable house in a calm neighborhood. The host was responsive, and the house had everything we needed. Great choice for anyone looking for a short or long rental.",
    rating: 5,
    profileImg: "https://i.pravatar.cc/150?img=7",
  },
];

const StarRating = ({ count }: { count: number }) => {
  return (
    <div className="text-yellow-500 text-lg">
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </div>
  );
};

const ReviewCard = ({ review }: { review: (typeof reviews)[0] }) => (
  <Card className="w-full">
    <CardContent className="py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={review.profileImg} />
            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-primary">{review.name}</p>
            <p className="text-sm text-muted-foreground">{review.date}</p>
          </div>
        </div>
        <StarRating count={review.rating} />
      </div>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Review On:</span>{" "}
          {review.title}
        </p>
        <p className="text-sm mt-2 text-foreground">{review.content}</p>
      </div>
    </CardContent>
  </Card>
);

const ReviewCardList = () => {
  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-6">Reviews</h2>
      <div className="space-y-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {reviews.map((review, index) => (
          <div key={review.id}>
            <ReviewCard review={review} />
            {/* {index !== reviews.length - 1 && <Separator className="mt-6" />} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCardList;
