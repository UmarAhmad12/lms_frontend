import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsFillCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourses, getAllCourses, updateCourse } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
ChartJs.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUserCount, subscribedCount } = useSelector((state) => state.stat);
  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    fontColor: "white",
    datasets: [
      {
        label: "User Details",
        data: [allUserCount, subscribedCount],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"],
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    fontColor: "white",
    datasets: [
      {
        label: "Sales/Month",
        data: monthlySalesRecord,
        backgroundColor: ["rgb(255, 99, 132)"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };

  const myCourse = useSelector((state) => state?.course?.courseData);

  const [editCourse, setEditCourse] = useState(null);

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete the course?")) {
      const res = await dispatch(deleteCourses(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  }

  async function onCourseUpdate() {
    const res = await dispatch(updateCourse(editCourse));
    if (res?.payload?.success) {
      await dispatch(getAllCourses());
      setEditCourse(null); // close the modal/form
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setEditCourse({
      ...editCourse,
      [name]: value,
    });
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
        <h1 className="text-center text-5xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-5 m-auto mx-10">
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            <div className="w-80 h-80">
              <Pie data={userData} />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Registered Users</p>
                  <h3 className="text-4xl font-bold">{allUserCount}</h3>
                </div>
                <FaUsers className="text-yellow-500 text-5xl" />
              </div>
              <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscribed Users</p>
                  <h3 className="text-4xl font-bold">{subscribedCount}</h3>
                </div>
                <FaUsers className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            <div className="h-80 w-full relative">
              <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscription Count</p>
                  <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                </div>
                <FcSalesPerformance className="text-yellow-500 text-5xl" />
              </div>
              <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Total Revenue</p>
                  <h3 className="text-4xl font-bold">
                    {allPayments?.count * 499}
                  </h3>
                </div>
                <GiMoneyStack className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-center text-3xl font-semibold">
              Courses overview
            </h1>
            <button
              onClick={() => {
                navigate("/course/create");
              }}
              className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
            >
              Create new course
            </button>
          </div>

          <table className="table overflow-x-scroll">
            <thead>
              <tr>
                <th>S No</th>
                <th>Course Title</th>
                <th>Course Category</th>
                <th>Instructor</th>
                <th>Total Lectures</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCourse?.map((course, idx) => {
                return (
                  <tr key={course?._id}>
                    <td>{idx + 1}</td>
                    <td>
                      <textarea
                        readOnly
                        value={course?.title}
                        className="w-40 h-auto bg-transparent resize-none"
                      ></textarea>
                    </td>
                    <td>{course?.category}</td>
                    <td>{course?.createdBy}</td>
                    <td>{course?.numberOfLectures}</td>
                    <td>
                      <textarea
                        value={course?.description || ""}
                        readOnly
                        className="w-60 overflow-y-auto h-auto bg-transparent resize-none"
                      ></textarea>
                    </td>
                    <td className="flex items-center gap-4">
                      <button
                        className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                        onClick={() =>
                          navigate("/course/displaylectures", {
                            state: { ...course },
                          })
                        }
                      >
                        <BsFillCollectionPlayFill />
                      </button>
                      <button
                        className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                        onClick={() => setEditCourse(course)}
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                        onClick={() => onCourseDelete(course?._id)}
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Update Course</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onCourseUpdate();
              }}
            >
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="w-full p-2 border rounded"
                  value={editCourse.title}
                  onChange={handleUserInput}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="w-full p-2 border rounded"
                  value={editCourse.category}
                  onChange={handleUserInput}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="instructor" className="block text-gray-700">Instructor</label>
                <input
                  type="text"
                  name="createdBy"
                  id="instructor"
                  className="w-full p-2 border rounded"
                  value={editCourse.createdBy}
                  onChange={handleUserInput}
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-gray-700">Total Lectures</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={editCourse.numberOfLectures}
                  onChange={(e) =>
                    setEditCourse({
                      ...editCourse,
                      numberOfLectures: e.target.value,
                    })
                  }
                />
              </div> */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">Description</label>
                <textarea
                  className="w-full p-2 border rounded"
                  name="description"
                  id="description"
                  value={editCourse.description}
                  onChange={handleUserInput}
                ></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                  onClick={() => setEditCourse(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </HomeLayout>
  );
}

export default AdminDashboard;
