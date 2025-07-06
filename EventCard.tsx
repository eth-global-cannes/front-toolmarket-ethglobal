import { Card, CardContent } from "./src/components/ui/card";
import { MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

interface EventCardProps {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  imageSrc: string;
  onClick?: () => void;
}

export default function EventCard({
  title,
  location,
  startDate,
  endDate,
  imageSrc,
  onClick,
}: EventCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card
        onClick={onClick}
        className="group overflow-hidden rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 transition-all duration-200 relative"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 90%, rgba(0,0,0,0.04) 100%)",
          }}
        />
        <CardContent className="p-0 relative">
          <div className="relative w-[200px] h-[160px] overflow-hidden bg-gray-100">
            <img
              src={imageSrc}
              alt={title}
              width={200}
              height={160}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              style={{
                width: "300px",
                height: "160px",
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/200x200/png?text=Event";
              }}
            />
          </div>
          <div className="p-4 space-y-3">
            <h3 className="font-medium text-base line-clamp-1">{title}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {startDate} - {endDate}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
