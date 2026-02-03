import { cn } from "@/lib/utils";

interface BookLoaderProps {
    className?: string;
}

export const BookLoader = ({ className }: BookLoaderProps) => {
    return (
        <div className={cn("book-loader my-[60px] mx-auto", className)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};
