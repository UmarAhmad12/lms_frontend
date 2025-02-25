import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../Components/CourseCard";
import Loader from "../../Components/Loader";
import SearchBtn from "../../Components/SearchBtn";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";


function CourseList() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);

  async function loadCourse() {
    setLoading(true);
    await dispatch(getAllCourses());
    setLoading(false);
  }

  useEffect(() => {
    loadCourse();
  }, [dispatch]);

  // search functionality

  function handleInputChange(e) {
    setQuery(e.target.value); 
  }

   // Filter the course data based on the search query
   const filteredCourses = courseData?.filter((course) =>
    course.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
        <h1 className="text-center text-3xl font-semibold mb-5">
          Explore the courses made by{" "}
          <span className="font-bold text-yellow-500">Industry experts</span>
        </h1>
        <SearchBtn
          onChange={handleInputChange}
          query={query}
        />
        {loading ? (
          <Loader
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <div className="mb-10 flex flex-wrap gap-14">
            {filteredCourses
              .map((element) => {
                return <CourseCard key={element._id} data={element} />;
              })}
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

export default CourseList;
