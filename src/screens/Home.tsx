import { Header } from "../components/Header";
import { CourseList } from "../components/CourseList/CourseList";

export const Home = () => {
  return (
    <>
      <Header />
      <div className="flex mt-120px flex-col items-center justify-center relative z-1">
        <h1 className="font-semibold text-4xl">Practicert</h1>
        <div className="max-w-lg text-center font-bold mt-5">
          Prepare yourself for most valuable IT certificates. Practice in
          simulator imitating real exam environment.
        </div>
        <CourseList />
      </div>
    </>
  );
};
