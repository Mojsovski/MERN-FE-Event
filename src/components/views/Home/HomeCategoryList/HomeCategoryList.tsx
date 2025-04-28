import { ICategory } from "@/types/Category";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  categories: ICategory[];
  isLoading: boolean;
}
const HomeCategoryList = (props: IProps) => {
  const { categories, isLoading } = props;
  return (
    <Card className="mx-6 mb-8 p-8 lg:mx-0">
      <CardHeader className="p-0">
        <h1 className="text-2xl font-bold text-danger">Event by Category</h1>
      </CardHeader>
      <CardBody className="mt-04 p-0">
        <div className="grid auto-cols-[8rem] grid-flow-col gap-4 overflow-x-auto lg:grid-cols-8">
          {!isLoading
            ? categories?.map((item) => (
                <Link
                  key={`category-${item._id}`}
                  href={`/event?category${item._id}`}
                  className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4"
                >
                  <Image
                    alt={`${item.name}`}
                    src={`${item.icon}`}
                    width={100}
                    height={100}
                    className="w-1/2"
                  />
                  <p className="text-md font-bold">{item.name}</p>
                </Link>
              ))
            : Array.from({ length: 7 }).map((index) => (
                <Skeleton
                  key={`list-category-${index}`}
                  className="aspect-square rounded-lg"
                />
              ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default HomeCategoryList;
