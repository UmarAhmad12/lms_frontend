import { useEffect, useState } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
  deleteCourseLectures,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    if (window.confirm("Are you sure you want to delete the course?")) {
      console.log(courseId, lectureId);
      await dispatch(
        deleteCourseLectures({ courseId: courseId, lectureId: lectureId })
      );
      await dispatch(getCourseLectures(courseId));
    }
  }

  useEffect(() => {
    console.log(state);
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id));
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-1 items-center justify-center min-h-[90vh] py-2 text-white mx-[2%]">
        <div className="text-center text-2xl font-semibold text-yellow-500">
          {state?.title}
        </div>

        {lectures && lectures.length > 0 ? (
          <div className="flex flex-col lg:flex-row w-full">
            {/* Left section for playing videos and displaying course details to admin */}
            <div className="space-y-5 w-full lg:w-2/3 p-2 rounded-lg">
              <video
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-tl-lg rounded-tr-lg w-full h-[60vh]"
                controls
                controlsList="nodownload"
              ></video>
              <div>
                <h1>
                  <span className="text-yellow-500"> Title: </span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>
                <p>
                  <span className="text-yellow-500">Description: </span>
                  {lectures && lectures[currentVideo]?.description}
                </p>
                {lectures[currentVideo]?.driveUrl && (
                  <p className="flex items-center gap-2">
                    <span className="text-yellow-500">Download Notes: </span>
                    <a
                      href={lectures && lectures[currentVideo]?.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      <FaArrowAltCircleDown />
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Right section for displaying list of lectures */}
            <ul className="w-full lg:w-1/3 p-2 rounded-lg shadow-md space-y-2 mt-5 lg:mt-0 max-h-[60vh] overflow-y-auto">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lecture list</p>
                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className="btn btn-primary btn-xs rounded-md font-semibold text-sm text-white"
                  >
                    Add new lecture
                  </button>
                )}
              </li>
              {lectures &&
                lectures.map((lecture, idx) => {
                  return (
                    <li className="space-y-2" key={lecture._id}>
                      <p
                        className="cursor-pointer hover:bg-slate-600 transition-all ease-in-out duration-300 p-2"
                        onClick={() => setCurrentVideo(idx)}
                      >
                        <span> Lecture {idx + 1} : </span>
                        {lecture?.title}
                      </p>
                      {role === "ADMIN" && (
                        <button
                          onClick={() =>
                            onLectureDelete(state?._id, lecture?._id)
                          }
                          className="btn btn-accent btn-xs text-white rounded-md font-semibold text-sm"
                        >
                          Delete lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : (
          role === "ADMIN" && (
            <button
              onClick={() =>
                navigate("/course/addlecture", { state: { ...state } })
              }
              className="bg-primary px-2 py-1 rounded-md font-semibold text-sm text-white"
            >
              Add new lecture
            </button>
          )
        )}
      </div>
    </HomeLayout>
  );
}

export default DisplayLectures;
